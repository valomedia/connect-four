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

import {useState} from 'react';
import Square from './Square.tsx';

/**
 * Board of the connect-four game.
 */
function Board() {
    const [value, setValue] = useState<('red' | 'blue' | null)[]>(
        Array.from({length: 43}, () => null)
    );
    function handleClickAt(square: number) {
        if (value[square] == null) {
            let tempValue = value;
            tempValue = value.slice();
            tempValue[square] = 'red';
            setValue(tempValue);
        }
    }

    return (
        <>
            <div>
                <Square value={value[36]} onClick={() => handleClickAt(36)} />
                <Square value={value[37]} onClick={() => handleClickAt(37)} />
                <Square value={value[38]} onClick={() => handleClickAt(38)} />
                <Square value={value[39]} onClick={() => handleClickAt(39)} />
                <Square value={value[40]} onClick={() => handleClickAt(40)} />
                <Square value={value[41]} onClick={() => handleClickAt(41)} />
                <Square value={value[42]} onClick={() => handleClickAt(42)} />
            </div>
            <div>
                <Square value={value[29]} onClick={() => handleClickAt(29)} />
                <Square value={value[30]} onClick={() => handleClickAt(30)} />
                <Square value={value[31]} onClick={() => handleClickAt(31)} />
                <Square value={value[32]} onClick={() => handleClickAt(32)} />
                <Square value={value[33]} onClick={() => handleClickAt(33)} />
                <Square value={value[34]} onClick={() => handleClickAt(34)} />
                <Square value={value[35]} onClick={() => handleClickAt(35)} />
            </div>
            <div>
                <Square value={value[22]} onClick={() => handleClickAt(22)} />
                <Square value={value[23]} onClick={() => handleClickAt(23)} />
                <Square value={value[24]} onClick={() => handleClickAt(24)} />
                <Square value={value[25]} onClick={() => handleClickAt(25)} />
                <Square value={value[26]} onClick={() => handleClickAt(26)} />
                <Square value={value[27]} onClick={() => handleClickAt(27)} />
                <Square value={value[28]} onClick={() => handleClickAt(28)} />
            </div>
            <div>
                <Square value={value[15]} onClick={() => handleClickAt(15)} />
                <Square value={value[16]} onClick={() => handleClickAt(16)} />
                <Square value={value[17]} onClick={() => handleClickAt(17)} />
                <Square value={value[18]} onClick={() => handleClickAt(18)} />
                <Square value={value[19]} onClick={() => handleClickAt(19)} />
                <Square value={value[20]} onClick={() => handleClickAt(20)} />
                <Square value={value[21]} onClick={() => handleClickAt(21)} />
            </div>
            <div>
                <Square value={value[8]} onClick={() => handleClickAt(8)} />
                <Square value={value[9]} onClick={() => handleClickAt(9)} />
                <Square value={value[10]} onClick={() => handleClickAt(10)} />
                <Square value={value[11]} onClick={() => handleClickAt(11)} />
                <Square value={value[12]} onClick={() => handleClickAt(12)} />
                <Square value={value[13]} onClick={() => handleClickAt(13)} />
                <Square value={value[14]} onClick={() => handleClickAt(14)} />
            </div>
            <div>
                <Square value={value[1]} onClick={() => handleClickAt(1)} />
                <Square value={value[2]} onClick={() => handleClickAt(2)} />
                <Square value={value[3]} onClick={() => handleClickAt(3)} />
                <Square value={value[4]} onClick={() => handleClickAt(4)} />
                <Square value={value[5]} onClick={() => handleClickAt(5)} />
                <Square value={value[6]} onClick={() => handleClickAt(6)} />
                <Square value={value[7]} onClick={() => handleClickAt(7)} />
            </div>
        </>
    );
}

export default Board;
