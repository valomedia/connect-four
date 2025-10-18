/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  App.tsx
//  connect-four
//
//  Created by:
//      * Jean-Pierre Höhmann
//

import './App.css';
import Board from './components/board.tsx';

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
