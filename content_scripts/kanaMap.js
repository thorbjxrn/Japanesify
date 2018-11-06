/*
 * File created By Thorbjørn Bonvik, 2017.
 * based on mozillas
 * This file contains the Map of word --> emoji substitutions.
 */

/* exported sortedEmojiMap */

let kanaa = new Map();
let kanai = new Map();
let kanao = new Map();
let kanau = new Map();
let kanae = new Map();
let kanan = new Map();


kanaa.set('a', 'あ');
kanaa.set('ka', 'か');

kanai.set('i', 'い');
kanai.set('oke', 'け');
kanai.set('ki', 'き');

kanan.set('n', 'ん');

let dictionary = [[false, Array.from(kanaa)], [false, Array.from(kanai)], [false,Array.from(kanao)], [false, Array.from(kanau)], [false, Array.from(kanae)], [false, Array.from(kanan)]];
//console.log(Array.from(dictionary[0][1]).toString());

// let tempArray = Array.from(a); //Array to sort


let tempArray = new Array();

let sortedKanaMap;; //getSortedMap();


/*
 * After all the dictionary entries have been set, sort them by length.
 *
 * Because iteration over Maps happens by insertion order, this avoids
 * scenarios where words that are substrings of other words get substituted
 * first, leading to the longer word's substitution never triggering.
 *
 * For example, the 'kya' substitution would never get triggered
 * if the 'ya' substitution happens first because the input term 'kya'
 * would become 'kゃ', and the search for 'kya' would not find any matches.
 */

function getSortedMap(){
  console.log(dictionary[0][1].length);

  for (var i = 0; i < dictionary.length; i++) {
    if(dictionary[i][0]){
      //console.log("ADD " + Array.from(dictionary[i][1]).toString());
      for(var j = 0; j < dictionary[i][1].length; j++){
        tempArray.push(Array.from(dictionary[i][1][j])); //adds all enabled kana-maps to the substitution array
      }

    }
  }

  //tempArray = Array.from(kanai);
console.log("TEMP ARRAY = " + tempArray[0]); //returns ka, か when working and from single pos. Has to be an two dimentional array.

  //tempArray.slice(0, activeCharacters); //limits the number of active japanese characters
  tempArray.sort((pair1, pair2) => {
    var firstWord = pair1[0];
    var secondWord = pair2[0];

    if (firstWord.length > secondWord.length) {
      // The first word should come before the second word.
      console.log("lefts+hift");
      return -1;
    }
    if (secondWord.length > firstWord.length) {
      // The second word should come before the first word.
      console.log("rights+hift");
      return 1;
    }
    console.log("noshift");
    // The words have the same length, it doesn't matter which comes first.
    return 0;
  });

  // Now that the entries are sorted, put them back into a Map.
  return new Map(tempArray);

}
