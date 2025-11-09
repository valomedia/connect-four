/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  eslint.config.js
//  connect-four
//
//  Created by:
//      * Jean-Pierre Höhmann
//

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {defineConfig, globalIgnores} from 'eslint/config'
import eslintReact from "@eslint-react/eslint-plugin"

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.strictTypeChecked,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
            // Enable lint rules for React
            eslintReact.configs['recommended-typescript'],
        ],
        languageOptions: {
            parserOptions: {
                project: [
                    './tsconfig.node.json',
                    './tsconfig.app.json'
                ],
                tsconfigRootDir: import.meta.dirname
            },
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
])
