import { browser } from "webextension-polyfill-ts";
import { JapanesifyState } from "../utils/types";

export const convertText = (text: string | null, selection: JapanesifyState): string => {
    const nRegex = new RegExp('n', 'gi')

    return text && selection.n ? text.replace(nRegex, 'ん') : text || ''
}

const togglePluginListener = (selection: JapanesifyState) => {
    document.body.textContent = convertText(document.body.textContent, selection)
}

browser.runtime.onMessage.addListener(togglePluginListener);
