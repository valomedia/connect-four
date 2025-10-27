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
<<<<<<< HEAD
 */
function Square({value}: {value: 'red' | 'blue' | null}) {
    return <button className="square">{value}</button>;
=======
 * @param onClick gives Square a function when clicked
 */
function Square({
    value,
    onClick,
}: {
    value: 'red' | 'blue' | null;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
>>>>>>> 9-add-onclick-prop-to-square
}

export default Square;
