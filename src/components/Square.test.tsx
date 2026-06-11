/*
 * Copyright (c) 2025.
 * valo.media GmbH
 * All rights reserved.
 */

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import Square from './Square.tsx';

describe('Square', () => {
    it.each([
        {value: null, expectedClassName: 'square-empty'},
        {value: 'red' as const, expectedClassName: 'square-red'},
        {value: 'blue' as const, expectedClassName: 'square-blue'},
    ])('renders the $expectedClassName state', ({value, expectedClassName}) => {
        render(<Square value={value} />);

        expect(screen.getByRole('button', {name: 'O'})).toHaveClass('square', expectedClassName);
    });

    it('calls the click handler when selected', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(<Square value={null} onClick={onClick} />);
        await user.click(screen.getByRole('button', {name: 'O'}));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
