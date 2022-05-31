import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import Popup from '../../../source/Popup/Popup';
import "@testing-library/jest-dom/extend-expect"
import { browser, Tabs } from 'webextension-polyfill-ts';
import { defaultJapanesifyState, JAPANESIFY_STATE } from '../../../source/utils/constants';

describe('Popup Component', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')

    beforeEach(() => {
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])
        window.localStorage.clear()
    })

    test('loads with button text enable', async () => {
        render(<Popup/>)

        screen.getByText('enable')
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
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, enabled: true})
        
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])

        await act(async () => {
            fireEvent.click(button)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, enabled: false})
    })
    
    test('when ん checkbox is pressed it sends correct message to tab', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('ん-switch')
        
        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, n: true})
        
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])

        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, n: false})
    })

    test('when あ checkbox is pressed it sends correct message to tab', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('あ-switch')
        
        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, a: true})
        
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])

        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, a:false})
    })
    
    test('when い checkbox is pressed it sends correct message to tab', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('い-switch')
        
        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, i: true})
        
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])

        await act(async () => {
            fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, i: false})
    })

    test('gets tab id to send the message when ん checkbox is pressed', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('ん-switch')
        
        await act(async () => {
            fireEvent.click(checkbox)
        })

        expect(browser.tabs.query).toBeCalled()
    })

    test('gets tab id to send the message when あ checkbox is pressed', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('あ-switch')
        
        await act(async () => {
            fireEvent.click(checkbox)
        })

        expect(browser.tabs.query).toBeCalled()
    })
    
    test('gets tab id to send the message when い checkbox is pressed', async () => {
        render(<Popup/>)

        const checkbox = screen.getByTestId('い-switch')
        
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

        const state = JSON.parse(window.localStorage.getItem(JAPANESIFY_STATE)!)

        expect(state).toEqual({...defaultJapanesifyState, enabled: true})
    })
    
    test('saves state to local storage when ん checkbox is pressed', async () => {
        render(<Popup/>)

        const checkBox = screen.getByTestId('ん-switch')
        
        await act(async () => {
            fireEvent.click(checkBox)
        })

        const state = JSON.parse(window.localStorage.getItem(JAPANESIFY_STATE)!)

        expect(state).toEqual({...defaultJapanesifyState, n: true})
    })
    
    test('saves state to local storage when あ checkbox is pressed', async () => {
        render(<Popup/>)

        const checkBox = screen.getByTestId('あ-switch')
        
        await act(async () => {
            fireEvent.click(checkBox)
        })

        const state = JSON.parse(window.localStorage.getItem(JAPANESIFY_STATE)!)

        expect(state).toEqual({...defaultJapanesifyState, a: true})
    })
    
    test('saves state to local storage when い checkbox is pressed', async () => {
        render(<Popup/>)

        const checkBox = screen.getByTestId('い-switch')
        
        await act(async () => {
            fireEvent.click(checkBox)
        })

        const state = JSON.parse(window.localStorage.getItem(JAPANESIFY_STATE)!)

        expect(state).toEqual({...defaultJapanesifyState, i: true})
    })

    test('renders button based on localStorage values', async () => {
        window.localStorage.setItem(JAPANESIFY_STATE, JSON.stringify({...defaultJapanesifyState, enabled: true}))
        render(<Popup/>)

        screen.getByText('disable')
    })

    test('renders ん check box based on localStorage values', async () => {
        window.localStorage.setItem(JAPANESIFY_STATE, JSON.stringify({...defaultJapanesifyState, n: true}))
        render(<Popup/>)

        const checkbox = screen.getByTestId('ん-switch')

        expect(checkbox).toBeChecked()
    })
    
    test('renders あ check box based on localStorage values', async () => {
        window.localStorage.setItem(JAPANESIFY_STATE, JSON.stringify({...defaultJapanesifyState, a: true}))
        render(<Popup/>)

        const checkbox = screen.getByTestId('あ-switch')

        expect(checkbox).toBeChecked()
    })
    
    test('renders い check box based on localStorage values', async () => {
        window.localStorage.setItem(JAPANESIFY_STATE, JSON.stringify({...defaultJapanesifyState, i: true}))
        render(<Popup/>)

        const checkbox = screen.getByTestId('い-switch')

        expect(checkbox).toBeChecked()
    })
})