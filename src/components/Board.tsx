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
        if (isGameFinished) {
            console.log("The game is finished, no more Input possible! Click Restart to play another round.");
            return;
        }
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

    /**
     * Moves the given pos one square to the left in the game grid.
     * @param pos starting position in the game grid
     * @param amount amount of move-operations
     */
    function left(pos: number, amount: number): number {
        // noinspection PointlessArithmeticExpressionJS
        return pos - 1 * amount;
    }
    /**
     * Moves the given pos one square to the right in the game grid.
     * @param pos starting position in the game grid
     * @param amount amount of move-operations
     */
    function right(pos: number, amount: number): number {
        // noinspection PointlessArithmeticExpressionJS
        return pos + 1 * amount;
    }
    /**
     * Moves the given pos one square up in the game grid.
     * @param pos starting position in the game grid
     * @param amount amount of move-operations
     */
    function up(pos: number, amount: number): number {
        return pos - 7 * amount;
    }
    /**
     * Moves the given pos one square down in the game grid.
     * @param pos starting position in the game grid
     * @param amount amount of move-operations
     */
    function down(pos: number, amount: number): number {
        return pos + 7 * amount;
    }
    /**
     * Moves the given pos one square to the left and one up in the game grid.
     * @param pos starting position in the game grid
     * @param amount amount of move-operations
     */
    function lup(pos: number, amount: number): number {
        return pos - 8 * amount;
    }
    /**
     * Moves the given pos one square to the right and one up in the game grid.
     * @param pos starting position in the game grid
     * @param amount amount of move-operations
     */
    function rup(pos: number, amount: number): number {
        return pos - 6 * amount;
    }
    /**
     * Moves the given pos one square to the left and one down in the game grid.
     * @param pos starting position in the game grid
     * @param amount amount of move-operations
     */
    function ldown(pos: number, amount: number): number {
        return pos + 6 * amount;
    }
    /**
     * Moves the given pos one square to the right and one down in the game grid.
     * @param pos starting position in the game grid
     * @param amount amount of move-operations
     */
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
            {[36, 29, 22, 15, 8, 1].map((rowStart) => (
                <div key={rowStart}>
                    {Array.from({length: 7}, (_, column) => rowStart + column).map((position) => (
                        <Square
                            key={position}
                            value={tokens[position]}
                            onClick={() => {
                                handleClickAt(position);
                            }}
                        />
                    ))}
                </div>
            ))}
            <button className='reset-button' onClick={reset}>Reset</button>
            {isGameFinished ? <div><p>{winner} won the game!</p> <p>Press Restart to play another match</p></div> : ""}
        </>
    );
}

export default Board;
