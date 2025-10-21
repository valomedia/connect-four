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
 */
function Square({ value }: { value: "red" | "blue" | null }) {
    function handleClick() {
        console.log("Clicked!");
    }

    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
}

export default Square;
