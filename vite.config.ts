/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  vite.config.ts
//  connect-four
//
//  Created by:
//      * Jean-Pierre Höhmann
//

import {configDefaults, defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'tests/integration/**'],
    setupFiles: './src/test/setup.ts',
  },
})
