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
 */
function Square({value}: {value: 'red'|'blue'|null}) {
	
	return ( 
		<button className='square'>{value}</button>
	);
}

export default Square;
