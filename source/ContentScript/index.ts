import { browser } from "webextension-polyfill-ts";
import { JapanesifyState } from "../utils/types";
import { defaultJapanesifyState } from "../utils/utils";

let previousState = defaultJapanesifyState

export const convertText = (node: Node, state: JapanesifyState) => {
    let nRegex = new RegExp('n', 'gi')
    let newCharacter = 'ん'

    // 'TEXTAREA', 'IFRAME', 'CANVAS', 'LINK', 'META']);
    const excludeElements: Set<string> = new Set(['SCRIPT', 'STYLE'])

    if(!state.n || (previousState.enabled && !state.enabled)) {
        nRegex = new RegExp('ん', 'gi')
        newCharacter = 'n'
    }
    
    if(node.nodeType === Node.TEXT_NODE) {
        if (node.parentNode && excludeElements.has(node.parentNode.nodeName)) return
        if((state.enabled || previousState.enabled)) {
            node.textContent = (node.textContent || '').replace(nRegex, newCharacter)
        }
    }
    else {
        for(let i = 0; i < node.childNodes.length; ++i) {
            convertText(node.childNodes[i], state)
        }
    }

}

const togglePluginListener = (state: JapanesifyState) => {

    if((state.enabled && state.n) || (previousState.enabled && previousState.n)) {
        convertText(document.body, state)
    }
    previousState = state
}

browser.runtime.onMessage.addListener(togglePluginListener);
