/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

//
//  ResetButton.tsx
//  connect-four
//
//  Created by:
//      * Daniel Schilling
//

import './ResetButton.css'

/**
 * Button with the ability to reset the Board of the connect-four game.
 * @param onClick assigns a function to the ResetButton that is executed when clicked.
 */
function ResetButton({onClick}: {onClick: React.MouseEventHandler<HTMLButtonElement>}) {

    return(
        <button className='reset-button' onClick={onClick}>
            Reset
        </button>
    )
}

export default ResetButton