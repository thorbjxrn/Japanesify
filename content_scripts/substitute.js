/*
 * This file is responsible for performing the logic of replacing
 * all occurrences of each mapped word with its kana counterpart.

Based on  mozillas webextensions-examples/kana-substitution/substitute.js


 */

/*global sortedKanaMap*/

// kanaMap.js defines the 'sortedKanaMap' variable.
// Referenced here to reduce confusion.

/*
 * For efficiency, create a word --> search RegEx Map too.
 */

 let kanaMap = updateMap();
 let regexs = new Map();
 for (let word of kanaMap.keys()) {
  // We want a global, case-insensitive replacement.
  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  regexs.set(word, new RegExp(word, 'gi'));
  }

/**
 * Substitutes kanas into text nodes.
 * If the node contains more than just text (ex: it has child nodes),
 * call replaceText() on each of its children.
 *
 * @param  {Node} node    - The target DOM Node.
 * @return {void}         - Note: the kana substitution is done inline.
 */
function updateMap(){
  /*
   * After all the dictionary entries have been set in kanaMap, sort them by length.
   *
   * Because iteration over Maps happens by insertion order, this avoids
   * scenarios where words that are substrings of other words get substituted
   * first, leading to the longer word's substitution never triggering.
   *
   * For example, the 'kya' substitution would never get triggered
   * if the 'ya' substitution happens first because the input term 'kya'
   * would become 'kゃ', and the search for 'kya' would not find any matches.
   */
  let tempArray = Array.from(dictionaryA);
  tempArray = tempArray.concat(Array.from(dictionaryN));
  //tempArray.slice(0, activeCharacters); //limit the number of active japanese characters
  tempArray.sort((pair1, pair2) => {
    const firstWord = pair1[0];
    const secondWord = pair2[0];

    if (firstWord.length > secondWord.length) {
      // The first word should come before the second word.
      return -1;
    }
    if (secondWord.length > firstWord.length) {
      // The second word should come before the first word.
      return 1;
    }

    // The words have the same length, it doesn't matter which comes first.
    return 0;
  });

  // Now that the entries are sorted, put them back into a Map.
  return( new Map(tempArray));

}

function replaceText (node) {



  // Setting textContent on a node removes all of its children and replaces
  // them with a single text node. Since we don't want to alter the DOM aside
  // from substituting text, we only substitute on single text nodes.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
  if (node.nodeType === Node.TEXT_NODE) {
    // This node only contains text.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType.

    // Skip textarea nodes due to the potential for accidental submission
    // of substituted kana where none was intended.
    if (node.parentNode &&
        node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }

    // Because DOM manipulation is slow, we don't want to keep setting
    // textContent after every replacement. Instead, manipulate a copy of
    // this string outside of the DOM and then perform the manipulation
    // once, at the end.
    let content = node.textContent;

    // Replace every occurrence of 'word' in 'content' with its kana.
    // Use the kanaMap for replacements.
    for (let [word, kana] of kanaMap) {
      // Grab the search regex for this word.
      const regex = regexs.get(word);

      // Actually do the replacement / substitution.
      // Note: if 'word' does not appear in 'content', nothing happens.
      content = content.replace(regex, kana);
    }

    // Now that all the replacements are done, perform the DOM manipulation.
    node.textContent = content;
  }
  else {
    // This node contains more than just text, call replaceText() on each
    // of its children.
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }
  }
}

// Start the recursion from the body tag.
function activate() {
  replaceText(document.body);

  // Now monitor the DOM for additions and substitute kana into new nodes.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // This DOM change was new nodes being added. Run our substitution
        // algorithm on each newly added node.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          replaceText(newNode);
        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

//activate();
