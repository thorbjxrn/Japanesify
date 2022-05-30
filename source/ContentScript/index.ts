import {browser} from 'webextension-polyfill-ts';
import {JapanesifyState} from '../utils/types';
import {defaultJapanesifyState} from '../utils/utils';

let previousState = defaultJapanesifyState;

export const convertText = (node: Node, state: JapanesifyState): void => {
  let nRegex = new RegExp('n', 'gi');
  let aRegex = new RegExp('a', 'gi')
  let newNCharacter = 'ん';
  let newACharacter = 'あ';

  // 'TEXTAREA', 'IFRAME', 'CANVAS', 'LINK', 'META'
  const excludeElements: Set<string> = new Set(['SCRIPT', 'STYLE']);

  if (!state.n || !state.enabled) {
    nRegex = new RegExp('ん', 'gi');
    newNCharacter = 'n';
  }

  if(!state.a || !state.enabled) {
    aRegex = new RegExp('あ', 'gi')
    newACharacter = 'a';
  }

  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && excludeElements.has(node.parentNode.nodeName)) {
      return;
    }
  
    node.textContent = (node.textContent || '').replace(nRegex, newNCharacter);
    node.textContent = (node.textContent || '').replace(aRegex, newACharacter);
  } else {
    node.childNodes.forEach((child) => {
      convertText(child, state);
    });
  }
};

export const togglePluginListener = (state: JapanesifyState): void => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // This DOM change was new nodes being added. Run our substitution
        // algorithm on each newly added node.
        mutation.addedNodes.forEach((newNode) => {
          convertText(newNode, state);
        });
      }
    });
  });

  if (
    // TODO: add test case for when hiragana is present and the extension
    // is not enabled it doesn't convert to roman alphabet.
    // i.e. Can delete 'state.enabled' and test pass
    (state.enabled && (state.n || state.a)) ||
    (previousState.enabled && (previousState.n || previousState.a))
  ) {
    convertText(document.body, state);
    // TODO: add test case that validate we stop observing when disabled.
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  previousState = state;
};

browser.runtime.onMessage.addListener(togglePluginListener);
