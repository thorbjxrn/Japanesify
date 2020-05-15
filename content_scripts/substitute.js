/*
 * This file is responsible for performing the logic of replacing
 * all occurrences of each mapped word with its emoji counterpart.
 */

const excludeElements = new Set(['TEXTAREA', 'SCRIPT', 'STYLE', 'IFRAME', 'CANVAS', 'LINK', 'META']);

/**
 * Substitutes emojis into text nodes.
 * If the node contains more than just text (ex: it has child nodes),
 * call replaceText() on each of its children.
 *
 * @param  {Node} node    - The target DOM Node.
 * @return {void}         - Note: the emoji substitution is done inline.
 */
function replaceText (node, characterMap, regexs) {
  // Setting textContent on a node removes all of its children and replaces
  // them with a single text node. Since we don't want to alter the DOM aside
  // from substituting text, we only substitute on single text nodes.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
  //console.log(`In node: ${node.tagName}`);
  if (node.nodeType === Node.TEXT_NODE) {
    // This node only contains text.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType.

    // Skip nodes that may cause problems in the web page.
    if (node.parentNode &&
      excludeElements.has(node.parentNode.nodeName)) {
      console.log(`Skip node parent: ${node.parentNode.nodeName}`);
      return;
    }

    // Because DOM manipulation is slow, we don't want to keep setting
    // textContent after every replacement. Instead, manipulate a copy of
    // this string outside of the DOM and then perform the manipulation
    // once, at the end.
    let content = node.textContent;

    // Replace every occurrence of 'word' in 'content' with its character.
    // Use the characterMap for replacements.
    for (let [word, emoji] of characterMap) {
      // Grab the search regex for this word.
      const regex = regexs.get(word);

      // Actually do the replacement / substitution.
      // Note: if 'word' does not appear in 'content', nothing happens.
      content = content.replace(regex, emoji);
    }

    // Now that all the replacements are done, perform the DOM manipulation.
    node.textContent = content;
  }
  else {
    // This node contains more than just text, call replaceText() on each
    // of its children.
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i], characterMap, regexs);
    }    
  }
}

browser.runtime.onMessage.addListener(({type, japanesify, characters}) => {
  if (type == "togglePlugin") {
    isCharacterEnabled(characters) && !japanesify ? convert(offCharacterState) : convert(characters);
  } 
});

const isCharacterEnabled = (characters) => {
  for(const char in characters) {
    if (characters[char]) {
      return true;
    }
  }
  return false;
}

// Use variable to b able to disconnect.
let observer;

const convert = (characters) => {

  const characterMap = getCharacterMap(characters);

  /*
  * For efficiency, create a word --> search RegEx Map too.
  */
  let regexs = new Map();
  for (let word of characterMap.keys()) {
    // We want a global, case-insensitive replacement.
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    regexs.set(word, new RegExp(word, 'gi'));
  }

  // Start the recursion from the body tag.
  replaceText(document.body, characterMap, regexs);


  if(observer) {
    observer.disconnect();
  }

  // Now monitor the DOM for additions and substitute emoji into new nodes.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // This DOM change was new nodes being added. Run our substitution
        // algorithm on each newly added node.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          replaceText(newNode, characterMap, regexs);
        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

