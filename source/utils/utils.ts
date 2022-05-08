import { browser } from "webextension-polyfill-ts"

export const getCurrentTabId = async () => {
    const currentTab = await browser.tabs.query({ active: true, currentWindow: true })
    return currentTab[0]?.id || 1
}
