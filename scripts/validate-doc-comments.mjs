/*
 * Copyright (c) 2026.
 * valo.media GmbH
 * All rights reserved.
 */

import {Application, ReflectionKind} from 'typedoc';

/**
 * Check declarations that TypeDoc's native validator skips:
 * parameters, inline parameter members, and reflections without source symbols.
 * @param {import('typedoc').Application} app - The TypeDoc application.
 * @returns {void}
 */
export function load(app) {
    app.on(Application.EVENT_VALIDATE_PROJECT, (project) => {
        const requiredKinds = app.options.getValue('requiredToBeDocumented')
            .reduce((kinds, name) => kinds | ReflectionKind[name], 0);

        for (const reflection of project.getReflectionsByKind(requiredKinds)) {
            if (reflection.flags.isExternal || reflection.hasComment()) continue;
            if (reflection.isDeclaration()
                && reflection.kindOf(ReflectionKind.SignatureContainer)
                && reflection.getAllSignatures().length > 0) continue;
            if (reflection.kindOf(ReflectionKind.SomeSignature)
                && reflection.parent?.hasComment()) continue;

            // Native validation handles source-backed declarations,
            // but deliberately skips everything nested inside a parameter.
            let ancestor = reflection.parent;
            while (ancestor && !ancestor.kindOf(ReflectionKind.Parameter)) {
                ancestor = ancestor.parent;
            }
            if (!ancestor && project.getSymbolIdFromReflection(reflection)) continue;

            app.logger.warn(
                `${reflection.getFriendlyFullName()} (${ReflectionKind[reflection.kind]}) has no doc-comment.`,
            );
        }
    });
}
