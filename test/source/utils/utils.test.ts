import browser, { Tabs } from "webextension-polyfill"
import { getCurrentTabId } from "../../../source/utils/utils"

describe('getCurrentTabId', () => {
    const querySpy = jest.spyOn(browser.tabs, 'query')

    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('defaults to 1 if no id available', async () => {
        querySpy.mockResolvedValueOnce([{} as Tabs.Tab])

        const id = await getCurrentTabId()

        expect(id).toEqual(1)
    })
    
    test('returns current tab id', async () => {
        querySpy.mockResolvedValueOnce([{id: 4} as Tabs.Tab])

        const id = await getCurrentTabId()

        expect(id).toEqual(4)
    })
})