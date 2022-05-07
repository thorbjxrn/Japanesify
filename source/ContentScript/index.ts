import { browser } from "webextension-polyfill-ts";

export const convertText = (text: string, selection: { n: boolean }): string => {
    const nRegex = new RegExp('n', 'gi')

    return selection.n ? text.replace(nRegex, 'ん') : text
}

const togglePluginListener = () => {}

browser.runtime.onMessage.addListener(togglePluginListener);
