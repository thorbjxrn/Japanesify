import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import Popup from '../../../source/Popup/Popup';
import '@testing-library/jest-dom/extend-expect'
import browser, { Tabs } from 'webextension-polyfill';
import { defaultJapanesifyState, JAPANESIFY_STATE } from '../../../source/utils/constants';

describe('Popup Component', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')

    beforeEach(() => {
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])
        window.localStorage.clear()
    })

    test('loads with button text enable', () => {
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
    
    test('when enable button is clicked it sends message to tab', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        await act(async () => {
            fireEvent.click(button)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, enabled: true})
        
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])

        await act(async () => {
            await fireEvent.click(button)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, enabled: false})
    })
    
    test.each`
      hiragana | letter
      ${'ん'}  | ${'n'}
      ${'あ'}  | ${'a'}
      ${'い'}  | ${'i'}
      ${'う'}  | ${'u'}
      ${'え'}  | ${'e'}
      ${'お'}  | ${'o'}
      ${'°'}   | ${'han'}
      ${'"'}   | ${'dak'}
      ${'きゃ'} | ${'yoon'}
    `('when $hiragana checkbox is pressed it sends correct message to tab', async ({hiragana, letter}: {hiragana: string, letter: string}) => {
        render(<Popup/>)

        const checkbox = screen.getByTestId(`${hiragana}-switch`)
        
        await act(async () => {
            await fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, [letter]: true})
        
        jest.resetAllMocks()
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])

        await act(async () => {
            await fireEvent.click(checkbox)
        })
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {...defaultJapanesifyState, [letter]: false})
    })

    test.each`
      hiragana
      ${'ん'}
      ${'あ'}
      ${'い'}
      ${'う'}
      ${'え'}
      ${'お'}
      ${'°'}
      ${'"'}
      ${'きゃ'}
    `('gets tab id to send the message when $hiragana checkbox is pressed', async ({hiragana}: {hiragana: string}) => {
        render(<Popup/>)

        const checkbox = screen.getByTestId(`${hiragana}-switch`)
        
        await act(async () => {
            await fireEvent.click(checkbox)
        })

        expect(browser.tabs.query).toBeCalled()
    })
    
    test('gets tab id to send the message when enable button is pressed', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        
        await act(async () => {
            await fireEvent.click(button)
        })

        expect(browser.tabs.query).toBeCalled()
    })

    test('saves state to local storage when enable button is pressed', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        
        await act(async () => {
            await fireEvent.click(button)
        })

        const state = JSON.parse(window.localStorage.getItem(JAPANESIFY_STATE) || '')

        expect(state).toEqual({...defaultJapanesifyState, enabled: true})
    })
    
    test.each`
      hiragana | letter
      ${'ん'}  | ${'n'}
      ${'あ'}  | ${'a'}
      ${'い'}  | ${'i'}
      ${'う'}  | ${'u'}
      ${'え'}  | ${'e'}
      ${'お'}  | ${'o'}
      ${'°'}   | ${'han'}
      ${'"'}   | ${'dak'}
      ${'きゃ'} | ${'yoon'}
    `('saves state to local storage when $hiragana checkbox is pressed', async ({hiragana, letter}: {hiragana: string, letter: string}) => {
        render(<Popup/>)

        const checkBox = screen.getByTestId(`${hiragana}-switch`)
        
        await act(async () => {
            fireEvent.click(checkBox)
        })

        const state = JSON.parse(window.localStorage.getItem(JAPANESIFY_STATE) || '')

        expect(state).toEqual({...defaultJapanesifyState, [letter]: true})
    })

    test('renders button based on localStorage values', () => {
        window.localStorage.setItem(JAPANESIFY_STATE, JSON.stringify({...defaultJapanesifyState, enabled: true}))
        render(<Popup/>)

        screen.getByText('disable')
    })

    test.each`
      hiragana | letter
      ${'ん'}  | ${'n'}
      ${'あ'}  | ${'a'}
      ${'い'}  | ${'i'}
      ${'う'}  | ${'u'}
      ${'え'}  | ${'e'}
      ${'お'}  | ${'o'}
      ${'°'}   | ${'han'}
      ${'"'}   | ${'dak'}
      ${'きゃ'} | ${'yoon'}
    `('renders $hiragana check box based on localStorage values', ({hiragana, letter} : {hiragana: string, letter: string}) => {
        window.localStorage.setItem(JAPANESIFY_STATE, JSON.stringify({...defaultJapanesifyState, [letter]: true}))
        render(<Popup/>)

        const checkbox = screen.getByTestId(`${hiragana}-switch`)

        expect(checkbox).toBeChecked()
    })
})