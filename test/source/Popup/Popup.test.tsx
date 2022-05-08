import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Popup from '../../../source/Popup/Popup';
import "@testing-library/jest-dom/extend-expect"
import { browser } from 'webextension-polyfill-ts';

describe('Popup Component', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('loads with button text enable', async () => {
        render(<Popup/>)

        screen.getByTestId('enable-button')
    })

    test('when enable button is clicked text changes to disable', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        fireEvent.click(button)
      
        expect(button).toHaveTextContent('disable')
    })
    
    test('when enable button is pressed it sends message to tab', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        fireEvent.click(button)
        expect(browser.tabs.sendMessage).toBeCalledWith(1, {enabled: true, n: false})
        
        jest.resetAllMocks()

        fireEvent.click(button)
        expect(browser.tabs.sendMessage).toBeCalledWith(1, {enabled: false, n: false})
    })
    
    test('when ん checkbox is pressed it sends correct message to tab', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('ん-switch')
        
        fireEvent.click(checkbox)
        expect(browser.tabs.sendMessage).toBeCalledWith(1, {enabled: false, n: true})
        
        jest.resetAllMocks()

        fireEvent.click(checkbox)
        expect(browser.tabs.sendMessage).toBeCalledWith(1, {enabled: false, n: false})
    })
})