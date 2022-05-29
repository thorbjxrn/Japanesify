import {browser} from 'webextension-polyfill-ts';
import {JapanesifyState} from '../utils/types';
import {defaultJapanesifyState} from '../utils/utils';

let previousState = defaultJapanesifyState;

export const convertText = (node: Node, state: JapanesifyState): void => {
  let nRegex = new RegExp('n', 'gi');
  let newCharacter = 'ん';

  // 'TEXTAREA', 'IFRAME', 'CANVAS', 'LINK', 'META'
  const excludeElements: Set<string> = new Set(['SCRIPT', 'STYLE']);

  if (!state.n || (previousState.enabled && !state.enabled)) {
    nRegex = new RegExp('ん', 'gi');
    newCharacter = 'n';
  }

  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && excludeElements.has(node.parentNode.nodeName))
      return;
    if (state.enabled || previousState.enabled) {
      node.textContent = (node.textContent || '').replace(nRegex, newCharacter);
    }
  } else {
    node.childNodes.forEach((child) => {
      convertText(child, state);
    });
  }
};

const togglePluginListener = (state: JapanesifyState): void => {
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
    (state.enabled && state.n) ||
    (previousState.enabled && previousState.n)
  ) {
    convertText(document.body, state);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  previousState = state;
};

browser.runtime.onMessage.addListener(togglePluginListener);
