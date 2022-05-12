import { browser, Tabs } from "webextension-polyfill-ts"
import { sendMessage } from "../../../source/Background/index"
import { japanesifyState } from "../../../source/utils/utils"

describe('Background script', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')

    beforeEach(() => {
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])
    })
    
    test('adds tabs onUpdated listener', () => {
        expect(browser.tabs.onUpdated.addListener)
    })
    
    test('adds tabs onActivated listener', () => {
        expect(browser.tabs.onActivated.addListener)
    })
    
    test('calls tabs sendMessage', async () => {
        window.localStorage.setItem(japanesifyState, JSON.stringify({enabled: false, n: true}))
        await sendMessage()

        expect(browser.tabs.sendMessage).toBeCalledWith(2, {enabled: false, n: true})
    })
})