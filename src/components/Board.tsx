/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  Board.tsx
//  connect-four
//
//  Created by:
//      * Daniel Schilling
//

import Square from './Square.tsx';

/**
 * Board of the connect-four game.
 */
function Board() {
    function handleClick() {
        console.log('Clicked!');
    }

    return (
        <>
            <div>
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
            </div>
            <div>
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
            </div>
            <div>
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
            </div>
            <div>
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
            </div>
            <div>
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
            </div>
            <div>
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
                <Square value={'blue'} />
                <Square value={null} onClick={handleClick} />
                <Square value={'red'} />
            </div>
        </>
    );
}

export default Board;
