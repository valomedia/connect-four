/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  Square.tsx
//  connect-four
//
//  Created by:
//      * Daniel Schilling
//

/**
 * Square of the connect-four game.
 * @param value gives the Square the information which color to display
 * @param onClick gives Square a function when clicked
 */
function Square({
    value,
    onClick,
}: {
    value: 'red' | 'blue' | null;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;
