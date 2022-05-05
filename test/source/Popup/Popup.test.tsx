import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Popup from '../../../source/Popup/Popup';
import "@testing-library/jest-dom/extend-expect"

describe('Popup Component', () => {
    test('loads with button text enable', async () => {
        render(<Popup/>)

        screen.getByText('enable')
    })

    test('when enable button is clicked text changes to disable', async () => {
        render(<Popup/>)

        const button = screen.getByText('enable')
        fireEvent.click(button)
      
        expect(button).toHaveTextContent('disable')
    })
})