import browser from 'webextension-polyfill';
import { getHiraganaMaps, defaultJapanesifyState, getKatakanaMaps } from '../utils/constants';
import { JapanesifyState } from '../utils/types';

let previousState = defaultJapanesifyState;

const canCovertText = (state: JapanesifyState): boolean => {
  if (!state.enabled) return false;

  let result = false;
  Object.entries(state).forEach(([k, value]) => {
    if (k !== 'enabled' && k !== 'kana' && value) {
      result = true;
    }
  });

  return result;
};

export const convertText = (node: Node, state: JapanesifyState): void => {
  const substitutions = new Map<RegExp, string>();
  const kanaMap = state.kana === 'katakana' ? getKatakanaMaps(state, previousState) : getHiraganaMaps(state, previousState)

  // Make a list of characters to substitute
  Object.entries(state).forEach(([k, value]) => {
    if (k !== 'enabled' && k !== 'kana') {
      const key = k as keyof typeof kanaMap;
      if (value) {
        kanaMap[key].forEach((replace, find) => {
          if (find && replace) {
            substitutions.set(new RegExp(find, 'gi'), replace);
          }
        });
      }

      //TODO: add tests for the previousState parts
      if (
        (previousState[key] && !value) ||
        (previousState.enabled && !state.enabled)
      ) {
        kanaMap[key].forEach((find, replace) => {
          if (find && replace) {
            substitutions.set(new RegExp(find, 'gi'), replace);
          }
        });
      }
    }
  });

  // 'TEXTAREA', 'IFRAME', 'CANVAS', 'LINK', 'META'
  const excludeElements: Set<string> = new Set(['SCRIPT', 'STYLE']);

  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && excludeElements.has(node.parentNode.nodeName)) {
      return;
    }

    substitutions.forEach((val, key) => {
      node.textContent = (node.textContent || '').replace(key, val);
    });
  } else {
    node.childNodes.forEach((child) => {
      convertText(child, state);
    });
  }
};

let observer: MutationObserver

export const togglePluginListener = (state: JapanesifyState): void => {
  if(observer) {
    observer.disconnect()
  }  
  observer = new MutationObserver((mutations) => {
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
    canCovertText(state) ||
    canCovertText(previousState)
  ) {
    convertText(document.body, state);

    if(canCovertText(state)) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  previousState = state;
};

browser.runtime.onMessage.addListener(togglePluginListener);
