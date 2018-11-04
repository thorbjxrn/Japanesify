/*
 * File created By Thorbjørn Bonvik, 2017.
 * based on mozillas
 * This file contains the Map of word --> emoji substitutions.
 */

/* exported sortedEmojiMap */
let dictionary = new Array();
let touplesA = new Map();
let arrayA = new Array(2);
let touplesN = new Map();
let arrayN = new Array(2);

  touplesA.set('a', 'あ');
  touplesA.set('ka', 'か');
  touplesA.set('sa', 'さ');
  touplesA.set('ta', 'た');
  touplesA.set('na', 'な');
  touplesA.set('ha', 'は');
  touplesA.set('ma', 'ま');
  touplesA.set('ya', 'や');
  touplesA.set('ra', 'ら');
  touplesA.set('wa', 'わ');

  arrayA[0] = false;
  arrayA[1] = touplesA;
  dictionary.push(arrayA);
/*
  dictionary.set('i', 'い');
  dictionary.set('ki', 'き');
  dictionary.set('shi', 'し');
  dictionary.set('chi', 'ち');
  dictionary.set('ni', 'に');
  dictionary.set('hi', 'ひ');
  dictionary.set('mi', 'み');
  dictionary.set('ri', 'り');
  //dictionary.set('wi', 'ゐ'); //outdated character

  dictionary.set('u', 'う');
  dictionary.set('ku', 'く');
  dictionary.set('su', 'す');
  dictionary.set('tsu', 'つ');
  dictionary.set('nu', 'ぬ');
  dictionary.set('hu', 'ふ');
  dictionary.set('mu', 'む');
  dictionary.set('ru', 'る');
  dictionary.set('yu', 'ゆ');

  dictionary.set('e', 'え');
  dictionary.set('ke', 'け');
  dictionary.set('se', 'せ');
  dictionary.set('te', 'て');
  dictionary.set('ne', 'ね');
  dictionary.set('he', 'へ');
  dictionary.set('me', 'め');
  dictionary.set('re', 'れ');
  //dictionary.set('we', 'ゑ'); //outdated character

  dictionary.set('o', 'お');
  dictionary.set('ko', 'こ');
  dictionary.set('so', 'そ');
  dictionary.set('to', 'と');
  dictionary.set('no', 'の');
  dictionary.set('ho', 'ほ');
  dictionary.set('mo', 'も');
  dictionary.set('ro', 'ろ');
  dictionary.set('yo', 'よ');
  dictionary.set('wo', 'を');
*/
  touplesN.set('n', 'ん');
  arrayN[0] = true;
  arrayN[1] = touplesN;
  dictionary.push(arrayN);

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
var tempArray = Array.from(dictionary);

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
let sortedKanaMap = new Map(tempArray);
