/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import Board from './Board.tsx';

function getSquares() {
    return screen.getAllByRole('button', {name: 'O'});
}

async function playColumn(column: number) {
    const user = userEvent.setup();
    await user.click(getSquares()[column - 1]);
}

describe('Board', () => {
    it('starts with an empty board and red to move', () => {
        render(<Board />);

        expect(screen.getByText(/red's/i)).toHaveClass('text-red');
        expect(getSquares()).toHaveLength(42);
        expect(getSquares().every((square) => square.classList.contains('square-empty'))).toBe(true);
    });

    it('drops tokens to the lowest open square in the selected column and alternates turns', async () => {
        render(<Board />);

        await playColumn(1);
        await playColumn(1);

        expect(getSquares()[35]).toHaveClass('square-red');
        expect(getSquares()[28]).toHaveClass('square-blue');
        expect(screen.getByText(/red's/i)).toHaveClass('text-red');
    });

    it('announces a winner, blocks additional moves, and resets the game', async () => {
        const user = userEvent.setup();
        render(<Board />);

        await playColumn(1); // red
        await playColumn(7); // blue
        await playColumn(2); // red
        await playColumn(7); // blue
        await playColumn(3); // red
        await playColumn(7); // blue
        await playColumn(4); // red wins horizontally

        expect(screen.getByText('red won the game!')).toBeInTheDocument();
        expect(getSquares()[38]).toHaveClass('square-red');

        await playColumn(5);

        expect(getSquares()[39]).toHaveClass('square-empty');

        await user.click(screen.getByRole('button', {name: 'Reset'}));

        expect(screen.queryByText('red won the game!')).not.toBeInTheDocument();
        expect(screen.getByText(/red's/i)).toHaveClass('text-red');
        expect(getSquares().every((square) => square.classList.contains('square-empty'))).toBe(true);
    });
});
