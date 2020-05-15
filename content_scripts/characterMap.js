
const getCharacterMap = (characters) => {
  let dictionary = getHiraganaMap(characters);

  /*
  * After all the dictionary entries have been set, sort them by length.
  *
  * Because iteration over Maps happens by insertion order, this avoids
  * scenarios where words that are substrings of other words get substituted
  * first, leading to the longer word's substitution never triggering.
  * 
  * For example, the 'ka' substitution would never get triggered
  * if the 'a' substitution happens first because the input term 'ka'
  * would become 'kあ', and the search for 'ka' would not find any matches.
  */
  let tempArray = Array.from(dictionary);
  tempArray.sort((pair1, pair2) => {
    // Each pair is an array with two entries: a syllable, and its japanese character.
    // Ex: ['ka', 'か']
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
  let sortedCharacterMap = new Map(tempArray);


  return sortedCharacterMap;
}

// Reverse key, value positions i.e (map[key] = value -----> map[value] = key) 
const swap = (charactertMap) => {
  const ret = new Map();
  charactertMap.forEach((val, key) => {
    ret.set(val, key);
  });
  return ret;
}

const offCharacterState = {n: false, a: false, i: false, u: false, o: false, e: false, 
  da: false, ha: false, yo: false};