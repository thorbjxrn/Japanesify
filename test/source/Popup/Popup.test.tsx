import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import Popup from '../../../source/Popup/Popup';
import '@testing-library/jest-dom/extend-expect'
import browser, { Tabs } from 'webextension-polyfill';
import userEvent from '@testing-library/user-event'
import { defaultJapanesifyState } from '../../../source/utils/constants';

describe('Popup Component', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')

    beforeEach(() => {
        jest.resetAllMocks();
        (browser.storage.local.get as jest.Mock).mockReset();
        (browser.storage.local.set as jest.Mock).mockReset();
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab]);
        (browser.storage.local.get as jest.Mock).mockResolvedValueOnce(defaultJapanesifyState)
    })

    test('loads with button text disabled', () => {
        render(<Popup/>)

        const button = screen.getByText('disabled')
        expect(button).toHaveClass('btn-danger')
    })

    test('when enable button is clicked text changes to enabled', async () => {
        render(<Popup/>)

        const button = screen.getByTestId('enable-button')
        await act(async () => {
            fireEvent.click(button)
        })
      
        expect(button).toHaveTextContent('enabled')
        expect(button).toHaveClass('btn-success')
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

        expect(browser.storage.local.set).toBeCalledWith({...defaultJapanesifyState, enabled: true})
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

        expect(browser.storage.local.set).toBeCalledWith({...defaultJapanesifyState, [letter]: true})
    })

    test('renders button based on localStorage values', async () => {
        (browser.storage.local.get as jest.Mock).mockReset();
        (browser.storage.local.get as jest.Mock).mockResolvedValueOnce({...defaultJapanesifyState, enabled: true});
        await act(async () => {
            render(<Popup/>)
        })

        screen.getByText('enabled')
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
    `('renders $hiragana check box based on localStorage values', async ({hiragana, letter} : {hiragana: string, letter: string}) => {
        (browser.storage.local.get as jest.Mock).mockReset();
        (browser.storage.local.get as jest.Mock).mockResolvedValueOnce({...defaultJapanesifyState, [letter]: true});

        await act(async () => {
            render(<Popup/>)
        })

        const checkbox = screen.getByTestId(`${hiragana}-switch`)

        expect(checkbox).toBeChecked()
    })

    test('renders dropdown with hiragana', () => {
        render(<Popup/>)
        const dropdown = screen.getByRole('combobox')

        expect(dropdown).toHaveValue('hiragana')
    })
    
    test('can select hiragana from dropdown', async () => {
        (browser.storage.local.get as jest.Mock).mockResolvedValueOnce({...defaultJapanesifyState, kana: 'katakana'})
        render(<Popup/>)

        const dropdown = screen.getByRole('combobox')
        const hiragana = screen.getByRole('option', {name: 'Hiragana'})
        
        await userEvent.selectOptions(dropdown, hiragana)

        expect(dropdown).toHaveValue('hiragana')
    })
    
    test('can select katakana from dropdown', async () => {
        render(<Popup/>)

        const dropdown = screen.getByRole('combobox')
        const katakana = screen.getByRole('option', {name: 'Katakana'})
        
        await userEvent.selectOptions(dropdown, katakana)

        expect(dropdown).toHaveValue('katakana')
    })
})