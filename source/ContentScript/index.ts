import { browser } from "webextension-polyfill-ts";
import { JapanesifyState } from "../utils/types";

export const convertText = (text: string | null, selection: JapanesifyState): string => {
    let nRegex = new RegExp('n', 'gi')
    let newCharacter = 'ん'
    if(!selection.n) {
        nRegex = new RegExp('ん', 'gi')
        newCharacter = 'n'
    }

    return text && selection.enabled ? text.replace(nRegex, newCharacter) : text || ''
}

const togglePluginListener = (selection: JapanesifyState) => {
    if(selection.enabled) {
        document.body.textContent = convertText(document.body.textContent, selection)
    }
}

browser.runtime.onMessage.addListener(togglePluginListener);
