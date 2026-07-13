/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  playwright.config.ts
//  connect-four
//

import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests/integration',
    fullyParallel: true,
    reporter: 'list',
    use: {
        baseURL: 'http://127.0.0.1:5173',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'NODE_ENV=test npm run dev -- --host 127.0.0.1 --strictPort',
        url: 'http://127.0.0.1:5173',
        reuseExistingServer: true,
    },
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
    ],
});
