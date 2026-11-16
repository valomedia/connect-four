[**connect-four**](../README.md)

***

[connect-four](../README.md) / components/Square

# components/Square

Individual cells of the Connect Four board.

## Interfaces

### SquareProps

Configuration for a single board square.

#### Properties

##### onClick?

> `optional` **onClick?**: `MouseEventHandler`\<`HTMLButtonElement`\>

Handles a player's attempt to place a token in this column.

##### value

> **value**: `"red"` \| `"blue"` \| `null`

Token color to display, or null for an empty square.

## Functions

### default()

> **default**(`props`): `Element`

Displays a red, blue, or empty square as a clickable button.

#### Parameters

##### props

[`SquareProps`](#squareprops)

The token color and optional click handler.

#### Returns

`Element`
