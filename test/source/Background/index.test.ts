import { browser, Tabs } from "webextension-polyfill-ts"
import { sendMessage } from "../../../source/Background/index"

describe('Background script', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')

    beforeEach(() => {
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])
    })
    
    test('adds tabs onUpdated listener', () => {
        expect(browser.tabs.onUpdated.addListener)
    })
    
    test('calls tabs sendMessage', async () => {
        await sendMessage()

        expect(browser.tabs.sendMessage).toBeCalled()
    })
})