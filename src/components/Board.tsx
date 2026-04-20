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
import './Board.css';

/**
 * Board of the connect-four game.
 */
function Board() {
    const [turn, setTurn] = useState<('red'|'blue')>('red')
    const [tokens, setTokens] = useState<('red' | 'blue' | null)[]>(
        Array.from({length: 43}, () => null)
    );
    const [winner, setWinner] = useState<('red'|'blue')>('red')
    const [isGameFinished, setIsGameFinished] = useState(false)

    function handleClickAt(square: number) {
        if (!isGameFinished) {
            if (tokens[square] == null) {
                while (tokens[square - 7] == null && square > 7) {
                    square = square - 7;
                }
                const newTokens = tokens.slice();
                newTokens[square] = turn;
                setTokens(newTokens);

                checkForWinner(square, turn);

                if (turn == 'red') {
                    setTurn('blue')
                } else {
                    setTurn('red')
                }
            }
        } else {
            console.log("The game is finished, no more Input possible! Click Restart to play another round.");
        }
    }

    

    function checkForWinner(lastPos: number, turn: 'red'|'blue') {
        let counter = 1;
        console.log(lastPos, turn);

        for (let i = 1; i <= 3; i++) {
            if (tokens[left(lastPos, i)] == turn) {
                counter += 1
            } else break
        }

        for (let i = 1; i <= 3; i++) {
            if (tokens[right(lastPos, i)] == turn) {
                counter += 1
            } else break
        }

        if (counter >= 4){
            playerWon(turn);
        }
        counter = 1;

        for (let i = 1; i <= 3; i++) {
            if (tokens[up(lastPos, i)] == turn) {
                counter += 1
            } else break
        }
        for (let i = 1; i <= 3; i++) {
            if (tokens[down(lastPos, i)] == turn) {
                counter += 1
            } else break
        }

        if (counter >= 4){
            playerWon(turn);
        }
        counter = 1;

        for (let i = 1; i <= 3; i++) {
            if (tokens[lup(lastPos, i)] == turn) {
                counter += 1
            } else break
        }
        for (let i = 1; i <= 3; i++) {
            if (tokens[rdown(lastPos, i)] == turn) {
                counter += 1
            } else break
        }

        if (counter >= 4){
            playerWon(turn);
        }
        counter = 1;

        for (let i = 1; i <= 3; i++) {
            if (tokens[rup(lastPos, i)] == turn) {
                counter += 1
            } else break
        }
        for (let i = 1; i <= 3; i++) {
            if (tokens[ldown(lastPos, i)] == turn) {
                counter += 1
            } else break
        }

        if (counter >= 4){
            playerWon(turn);
        }
    }

    function left(pos: number, amount: number): number {
        // noinspection PointlessArithmeticExpressionJS
        return pos - 1 * amount;
    }
    function right(pos: number, amount: number): number {
        // noinspection PointlessArithmeticExpressionJS
        return pos + 1 * amount;
    }
    function up(pos: number, amount: number): number {
        return pos - 7 * amount;
    }
    function down(pos: number, amount: number): number {
        return pos + 7 * amount;
    }
    function lup(pos: number, amount: number): number {
        return pos - 8 * amount;
    }
    function rup(pos: number, amount: number): number {
        return pos - 6 * amount;
    }
    function ldown(pos: number, amount: number): number {
        return pos + 6 * amount;
    }
    function rdown(pos: number, amount: number): number {
        return pos + 8 * amount;
    }

    function playerWon(turn: 'red'|'blue') {
        setIsGameFinished(true);
        setWinner(turn);
        console.log(turn + " won the game");
    }

    function reset() {
        setTurn('red');
        setTokens(Array.from({length: 43}, () => null))
        setIsGameFinished(false);
    }

    return (
        <>
            <p className="turn-text">
                It's <span className={'text-' + turn}>{turn}'s </span>turn
            </p>
            <div>
                <Square value={tokens[36]} onClick={() => handleClickAt(36)} />
                <Square value={tokens[37]} onClick={() => handleClickAt(37)} />
                <Square value={tokens[38]} onClick={() => handleClickAt(38)} />
                <Square value={tokens[39]} onClick={() => handleClickAt(39)} />
                <Square value={tokens[40]} onClick={() => handleClickAt(40)} />
                <Square value={tokens[41]} onClick={() => handleClickAt(41)} />
                <Square value={tokens[42]} onClick={() => handleClickAt(42)} />
            </div>
            <div>
                <Square value={tokens[29]} onClick={() => handleClickAt(29)} />
                <Square value={tokens[30]} onClick={() => handleClickAt(30)} />
                <Square value={tokens[31]} onClick={() => handleClickAt(31)} />
                <Square value={tokens[32]} onClick={() => handleClickAt(32)} />
                <Square value={tokens[33]} onClick={() => handleClickAt(33)} />
                <Square value={tokens[34]} onClick={() => handleClickAt(34)} />
                <Square value={tokens[35]} onClick={() => handleClickAt(35)} />
            </div>
            <div>
                <Square value={tokens[22]} onClick={() => handleClickAt(22)} />
                <Square value={tokens[23]} onClick={() => handleClickAt(23)} />
                <Square value={tokens[24]} onClick={() => handleClickAt(24)} />
                <Square value={tokens[25]} onClick={() => handleClickAt(25)} />
                <Square value={tokens[26]} onClick={() => handleClickAt(26)} />
                <Square value={tokens[27]} onClick={() => handleClickAt(27)} />
                <Square value={tokens[28]} onClick={() => handleClickAt(28)} />
            </div>
            <div>
                <Square value={tokens[15]} onClick={() => handleClickAt(15)} />
                <Square value={tokens[16]} onClick={() => handleClickAt(16)} />
                <Square value={tokens[17]} onClick={() => handleClickAt(17)} />
                <Square value={tokens[18]} onClick={() => handleClickAt(18)} />
                <Square value={tokens[19]} onClick={() => handleClickAt(19)} />
                <Square value={tokens[20]} onClick={() => handleClickAt(20)} />
                <Square value={tokens[21]} onClick={() => handleClickAt(21)} />
            </div>
            <div>
                <Square value={tokens[8]} onClick={() => handleClickAt(8)} />
                <Square value={tokens[9]} onClick={() => handleClickAt(9)} />
                <Square value={tokens[10]} onClick={() => handleClickAt(10)} />
                <Square value={tokens[11]} onClick={() => handleClickAt(11)} />
                <Square value={tokens[12]} onClick={() => handleClickAt(12)} />
                <Square value={tokens[13]} onClick={() => handleClickAt(13)} />
                <Square value={tokens[14]} onClick={() => handleClickAt(14)} />
            </div>
            <div>
                <Square value={tokens[1]} onClick={() => handleClickAt(1)} />
                <Square value={tokens[2]} onClick={() => handleClickAt(2)} />
                <Square value={tokens[3]} onClick={() => handleClickAt(3)} />
                <Square value={tokens[4]} onClick={() => handleClickAt(4)} />
                <Square value={tokens[5]} onClick={() => handleClickAt(5)} />
                <Square value={tokens[6]} onClick={() => handleClickAt(6)} />
                <Square value={tokens[7]} onClick={() => handleClickAt(7)} />
            </div>
            <button className='reset-button' onClick={reset}>Reset</button>
            {isGameFinished ? <div><p>{winner} won the game!</p> <p>Press Restart to play another match</p></div> : ""}
        </>
    );
}

export default Board;
