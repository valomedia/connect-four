/*
 * Copyright (c) 2025-2026.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  Square.tsx
//  connect-four
//

/**
 * Individual cells of the Connect Four board.
 * @module
 */

import './Square.css';

/** Configuration for a single board square. */
export interface SquareProps {
    /** Token color to display, or null for an empty square. */
    value: 'red' | 'blue' | null;
    /** Handles a player's attempt to place a token in this column. */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Displays a red, blue, or empty square as a clickable button.
 * @param props - The token color and optional click handler.
 */
function Square({
    value,
    onClick,
}: SquareProps) {
    return (
        <button
            className={'square ' + (value ? 'square-' + value : 'square-empty')}
            onClick={onClick}
        >
            O
        </button>
    );
}

export default Square;
