import { browser } from "webextension-polyfill-ts";
import { JapanesifyState } from "../utils/types";
import { defaultJapanesifyState } from "../utils/utils";

let previousState = defaultJapanesifyState

export const convertText = (text: string | null, state: JapanesifyState): string => {
    let nRegex = new RegExp('n', 'gi')
    let newCharacter = 'ん'

    if(!state.n || (previousState.enabled && !state.enabled)) {
        nRegex = new RegExp('ん', 'gi')
        newCharacter = 'n'
    }

    return text && (state.enabled || previousState.enabled) ? text.replace(nRegex, newCharacter) : text || ''
}

const togglePluginListener = (state: JapanesifyState) => {
    if(state.enabled || previousState.enabled) {
        document.body.textContent = convertText(document.body.textContent, state)
    }
    previousState = state
}

browser.runtime.onMessage.addListener(togglePluginListener);
