import { browser, Tabs } from "webextension-polyfill-ts"
import { sendMessage } from "../../../source/Background/index"
import { JAPANESIFY_STATE } from "../../../source/utils/utils"

describe('Background script', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')

    beforeEach(() => {
        querySpy.mockResolvedValueOnce([{id: 2} as Tabs.Tab])
        window.localStorage.clear()
    })
    
    test('adds tabs onUpdated listener', () => {
        expect(browser.tabs.onUpdated.addListener).toBeCalledTimes(1)
    })
    
    test('adds tabs onActivated listener', () => {
        expect(browser.tabs.onActivated.addListener).toBeCalledTimes(1)
    })
    
    test('calls tabs sendMessage with local storage state', async () => {
        window.localStorage.setItem(JAPANESIFY_STATE, JSON.stringify({enabled: false, n: true, a: true}))
        await sendMessage()
        
        expect(browser.tabs.sendMessage).toBeCalledWith(2, {enabled: false, n: true, a: true})
    })

    test('calls tabs sendMessage with default state', async () => {
        await sendMessage()

        expect(browser.tabs.sendMessage).toBeCalledWith(2, {enabled: false, n: false, a: false})
    })
})