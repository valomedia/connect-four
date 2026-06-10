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

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
