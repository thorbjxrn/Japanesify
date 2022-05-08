import { browser } from "webextension-polyfill-ts";

export const convertText = (text: string | null, selection: { n: boolean }): string => {
    const nRegex = new RegExp('n', 'gi')

    return text && selection.n ? text.replace(nRegex, 'ん') : text || ''
}

const togglePluginListener = (selection: any) => {
    document.body.textContent = convertText(document.body.textContent, selection)
}

browser.runtime.onMessage.addListener(togglePluginListener);
