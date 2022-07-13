import {browser} from 'webextension-polyfill-ts';
import {getHiraganaMaps, defaultJapanesifyState} from '../utils/constants';
import {JapanesifyState} from '../utils/types';

let previousState = defaultJapanesifyState;

const canCovertText = (state: JapanesifyState): boolean => {
  if (!state.enabled) return false;

  let result = false;
  Object.entries(state).forEach(([k, value]) => {
    if (k !== 'enabled' && value) {
      result = true;
    }
  });

  return result;
};

export const convertText = (node: Node, state: JapanesifyState): void => {
  const substitutions = new Map<RegExp, string>();
  const hiraMap = getHiraganaMaps(state, previousState);

  // Make a list of characters to substitute
  Object.entries(state).forEach(([k, value]) => {
    if (k !== 'enabled') {
      const key = k as keyof typeof hiraMap;
      if (value) {
        hiraMap[key].forEach((replace, find) => {
          substitutions.set(new RegExp(find, 'gi'), replace);
        });
      }

      if (!value || !state.enabled) {
        hiraMap[key].forEach((find, replace) => {
          substitutions.set(new RegExp(find, 'gi'), replace);
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
    canCovertText(state) ||
    canCovertText(previousState)
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
