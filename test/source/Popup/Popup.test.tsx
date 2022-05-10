import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Popup from '../../../source/Popup/Popup';
import "@testing-library/jest-dom/extend-expect"
import { browser, Tabs } from 'webextension-polyfill-ts';
import { act } from 'react-dom/test-utils';

describe('Popup Component', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')

    beforeEach(() => {
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])
    })

    test('loads with button text enable', async () => {
        render(<Popup/>)

        screen.getByTestId('enable-button')
    })

    test('when enable button is clicked text changes to disable', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        await act(async () => {
            fireEvent.click(button)
        })
      
        expect(button).toHaveTextContent('disable')
    })
    
    test('when enable button is pressed it sends message to tab', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        await act(async () => {
            fireEvent.click(button)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {enabled: true, n: false})
        
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])

        await act(async () => {
            fireEvent.click(button)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {enabled: false, n: false})
    })
    
    test('when ん checkbox is pressed it sends correct message to tab', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('ん-switch')
        
        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {enabled: false, n: true})
        
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])

        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {enabled: false, n: false})
    })

    test('gets tab id to send the message when checkbox is pressed', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('ん-switch')
        
        await act(async () => {
            fireEvent.click(checkbox)
        })

        expect(browser.tabs.query).toBeCalled()
    })
    
    test('gets tab id to send the message when enable button is pressed', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        
        await act(async () => {
            fireEvent.click(button)
        })

        expect(browser.tabs.query).toBeCalled()
    })

    test('saves state to local storage when enable button is pressed', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        
        await act(async () => {
            fireEvent.click(button)
        })

        expect(browser.storage.local.set).toBeCalledWith({state:{enabled: true, n: false}})
    })
    
    test('saves state to local storage when checkbox is pressed', async () => {
        render(<Popup/>)

        const checkBox = screen.getByTestId('ん-switch')
        
        await act(async () => {
            fireEvent.click(checkBox)
        })

        expect(browser.storage.local.set).toBeCalledWith({state:{enabled: false, n: true}})
    })
})