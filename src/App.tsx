/*
 * Copyright (c) 2025-2026.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  App.tsx
//  connect-four
//

/**
 * Top-level page for the Connect Four game.
 * @module
 */

import './App.css';
import Board from './components/Board.tsx';

/**
 * Entry point for the connect-four game.
 */
function App() {
    return (
        <>
            <h1>Connect Four</h1>
            <div className='card'>
                <Board />
            </div>
        </>
    );
}

export default App;
