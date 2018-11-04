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

dictionaryA.set('enabled', true);
dictionaryA.set('a', 'あ');
dictionaryA.set('ka', 'か');
dictionaryA.set('sa', 'さ');
dictionaryA.set('ta', 'た');
dictionaryA.set('na', 'な');
dictionaryA.set('ha', 'は');
dictionaryA.set('ma', 'ま');
dictionaryA.set('ya', 'や');
dictionaryA.set('ra', 'ら');
dictionaryA.set('wa', 'わ');

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

dictionaryN.set('n', 'ん');
dictionaryN.set('enabled', false);
