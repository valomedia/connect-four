/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  connect-four.spec.ts
//  connect-four
//
//  Created by:
//      * OpenClaw
//

import {expect, test, type Locator, type Page} from '@playwright/test';

function getSquares(page: Page): Locator {
    return page.getByRole('button', {name: 'O'});
}

async function playColumn(page: Page, column: number): Promise<void> {
    await getSquares(page).nth(column - 1).click();
}

test.describe('Connect Four', () => {
    test('renders an empty board in the browser', async ({page}) => {
        await page.goto('/');

        await expect(page.getByRole('heading', {name: 'Connect Four'})).toBeVisible();
        await expect(page.getByText("It's red's turn")).toBeVisible();
        await expect(getSquares(page)).toHaveCount(42);
        await expect(getSquares(page).first()).toHaveClass(/square-empty/);
    });

    test('plays a winning game and resets from the browser', async ({page}) => {
        await page.goto('/');

        await playColumn(page, 1); // red
        await playColumn(page, 7); // blue
        await playColumn(page, 2); // red
        await playColumn(page, 7); // blue
        await playColumn(page, 3); // red
        await playColumn(page, 7); // blue
        await playColumn(page, 4); // red wins horizontally

        await expect(page.getByText('red won the game!')).toBeVisible();
        await expect(getSquares(page).nth(35)).toHaveClass(/square-red/);
        await expect(getSquares(page).nth(38)).toHaveClass(/square-red/);

        await playColumn(page, 5);

        await expect(getSquares(page).nth(39)).toHaveClass(/square-empty/);

        await page.getByRole('button', {name: 'Reset'}).click();

        await expect(page.getByText('red won the game!')).toHaveCount(0);
        await expect(page.getByText("It's red's turn")).toBeVisible();
        await expect(getSquares(page).first()).toHaveClass(/square-empty/);
    });
});
