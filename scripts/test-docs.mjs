/*
 * Copyright (c) 2026.
 * valo.media GmbH
 * All rights reserved.
 */

import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {after, test} from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const fixture = mkdtempSync(join(tmpdir(), 'connect-four-docs-'));
const env = {...process.env, HUSKY: '1'};
// A parent commit may use an alternate index or repository.
// The fixture must never inherit those Git settings.
for (const key of Object.keys(env)) {
    if (key.startsWith('GIT_')) delete env[key];
}
after(() => rmSync(fixture, {recursive: true, force: true}));

for (const path of ['src', 'scripts', '.husky', 'package.json', 'package-lock.json', 'tsconfig.app.json', 'typedoc.json']) {
    cpSync(join(root, path), join(fixture, path), {recursive: true});
}
symlinkSync(join(root, 'node_modules'), join(fixture, 'node_modules'), 'dir');
writeFileSync(join(fixture, '.gitignore'), 'node_modules\n');

function run(command, args) {
    const result = spawnSync(command, args, {cwd: fixture, env, encoding: 'utf8', timeout: 60_000});
    assert.ifError(result.error);
    return {status: result.status, output: result.stdout + result.stderr};
}

function succeed(command, args) {
    const result = run(command, args);
    assert.equal(result.status, 0, result.output);
    return result.output;
}

function commit() {
    return run('git', ['commit', '-m', 'test: verify documentation hook']);
}

succeed('git', ['init', '--quiet']);
succeed('git', ['config', 'user.name', 'Documentation tests']);
succeed('git', ['config', 'user.email', 'docs@example.invalid']);
succeed('git', ['config', 'commit.gpgsign', 'false']);
succeed('npm', ['run', 'prepare']);

const api = `/**
 * API documentation validation fixture.
 * @module
 */

/**
 * Formats a value with a prefix.
 * @typeParam T - Type of the formatted value.
 * @param value - Value to format.
 * @param options - Formatting options.
 */
export function format<T>(value: T, options: {
    /** Prefix placed before the value. */
    prefix: string;
}): string {
    return options.prefix + String(value);
}
`;
const apiPath = join(fixture, 'src/docs-fixture.ts');
writeFileSync(apiPath, api);

function rejectCommit(path, contents, expected) {
    const original = readFileSync(path, 'utf8');
    const head = succeed('git', ['rev-parse', 'HEAD']);
    try {
        writeFileSync(path, contents);
        succeed('git', ['add', '--', path]);
        const result = commit();
        assert.notEqual(result.status, 0, result.output);
        assert.match(result.output, expected);
        assert.equal(succeed('git', ['rev-parse', 'HEAD']), head);
    } finally {
        writeFileSync(path, original);
        succeed('git', ['add', '--', path]);
    }
}

test('installed hook generates and commits Markdown without staging unrelated files', () => {
    succeed('git', ['add', '.']);
    writeFileSync(join(fixture, 'unrelated.txt'), 'Do not stage this file.\n');
    const result = commit();
    assert.equal(result.status, 0, result.output);
    const markdown = succeed('git', ['show', 'HEAD:docs/api/components/Square/interfaces/SquareProps.md']);
    assert.match(markdown, /Token color to display/);
    assert.match(succeed('git', ['status', '--short']), /\?\? unrelated.txt/);
    const files = succeed('git', ['ls-tree', '-r', '--name-only', 'HEAD']);
    assert.doesNotMatch(files, /unrelated.txt/);
    assert.doesNotMatch(files, /docs\/api\/.*(?:main|\.test|\.spec|setup)/);
});

test('generation is deterministic', () => {
    succeed('npm', ['run', 'docs']);
    succeed('git', ['diff', '--exit-code', '--', 'docs/api']);
});

for (const [name, comment] of [
    ['module', '/**\n * API documentation validation fixture.\n * @module\n */'],
    ['function', '/**\n * Formats a value with a prefix.\n * @typeParam T - Type of the formatted value.\n * @param value - Value to format.\n * @param options - Formatting options.\n */'],
    ['type parameter', ' * @typeParam T - Type of the formatted value.\n'],
    ['parameter', ' * @param value - Value to format.\n'],
    ['object parameter', ' * @param options - Formatting options.\n'],
    ['inline parameter property', '    /** Prefix placed before the value. */\n'],
]) {
    test(`commit rejects an undocumented ${name}`, () => {
        rejectCommit(apiPath, api.replace(comment, ''), /has no doc-comment|does not have any documentation/);
    });
}

test('commit rejects an undocumented exported interface property', () => {
    const path = join(fixture, 'src/components/Square.tsx');
    rejectCommit(path, readFileSync(path, 'utf8').replace(
        '    /** Token color to display, or null for an empty square. */\n', '',
    ), /has no doc-comment|does not have any documentation/);
});

test('commit rejects an undocumented new export', () => {
    rejectCommit(apiPath, api + '\nexport const undocumented = true;\n', /undocumented.*does not have any documentation/);
});

test('commit rejects partially staged inputs without changing the index or worktree', () => {
    const original = readFileSync(apiPath, 'utf8');
    const staged = original.replace('Formats a value', 'Formats a staged value');
    const unstaged = staged.replace('Formats a staged value', 'Formats an unstaged value');
    try {
        writeFileSync(apiPath, staged);
        succeed('git', ['add', 'src/docs-fixture.ts']);
        writeFileSync(apiPath, unstaged);
        const result = commit();
        assert.notEqual(result.status, 0, result.output);
        assert.match(result.output, /stage or stash/);
        assert.equal(readFileSync(apiPath, 'utf8'), unstaged);
        assert.equal(succeed('git', ['show', ':src/docs-fixture.ts']), staged);
    } finally {
        writeFileSync(apiPath, original);
        succeed('git', ['add', 'src/docs-fixture.ts']);
    }
});

for (const ignored of [false, true]) {
    test(`commit rejects ${ignored ? 'ignored' : 'untracked'} source instead of documenting uncommitted code`, () => {
        const path = join(fixture, 'src/untracked.ts');
        try {
            writeFileSync(path, 'export const undocumented = true;\n');
            if (ignored) {
                writeFileSync(join(fixture, '.git/info/exclude'), 'src/untracked.ts\n');
                succeed('git', ['check-ignore', 'src/untracked.ts']);
            }
            const result = commit();
            assert.notEqual(result.status, 0, result.output);
            assert.match(result.output, /stage or stash/);
            assert.ok(existsSync(path));
        } finally {
            rmSync(path);
        }
    });
}

test('hook removes stale generated pages when a documented module is deleted', () => {
    rmSync(apiPath);
    succeed('git', ['add', 'src/docs-fixture.ts']);
    const result = commit();
    assert.equal(result.status, 0, result.output);
    assert.doesNotMatch(succeed('git', ['ls-tree', '-r', '--name-only', 'HEAD', 'docs/api']), /docs-fixture/);
    succeed('git', ['diff', '--exit-code', '--', 'docs/api']);
});
