import { browser, Tabs } from "webextension-polyfill-ts"
import { sendMessage } from "../../../source/Background/index"

describe('Background script', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')
    const storageGetSpy = jest.spyOn(browser.storage.local, 'get')

    beforeEach(() => {
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])
        storageGetSpy.mockResolvedValueOnce({enabled: false, n: true})
    })
    
    test('adds tabs onUpdated listener', () => {
        expect(browser.tabs.onUpdated.addListener)
    })
    
    test('calls tabs sendMessage', async () => {
        await sendMessage()

        expect(browser.tabs.sendMessage).toBeCalledWith(2, {enabled: false, n: true})
    })
})