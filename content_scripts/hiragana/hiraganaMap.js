/*
 * This file contains the Map of word --> hiragana substitutions.
 */

const hiraA = new Map();
const hiraI = new Map();
const hiraO = new Map();
const hiraU = new Map();
const hiraE = new Map();
const hiraN = new Map();

hiraA.set('a', 'あ');
hiraA.set('ka', 'か');
hiraA.set('sa', 'さ');
hiraA.set('ta', 'た');
hiraA.set('na', 'な');
hiraA.set('ha', 'は');
hiraA.set('ma', 'ま');
hiraA.set('ya', 'や');
hiraA.set('ra', 'ら');
hiraA.set('wa', 'わ');

hiraI.set('i', 'い');
hiraI.set('ki', 'き');
hiraI.set('shi', 'し');
hiraI.set('chi', 'ち');
hiraI.set('ni', 'に');
hiraI.set('hi', 'ひ');
hiraI.set('mi', 'み');
hiraI.set('ri', 'り');
//kanai.set('wi', 'ゐ'); //outdated character

hiraU.set('u', 'う');
hiraU.set('ku', 'く');
hiraU.set('su', 'す');
hiraU.set('tsu', 'つ');
hiraU.set('nu', 'ぬ');
hiraU.set('fu', 'ふ');
hiraU.set('mu', 'む');
hiraU.set('ru', 'る');
hiraU.set('yu', 'ゆ');

hiraE.set('e', 'え');
hiraE.set('ke', 'け');
hiraE.set('se', 'せ');
hiraE.set('te', 'て');
hiraE.set('ne', 'ね');
hiraE.set('he', 'へ');
hiraE.set('me', 'め');
hiraE.set('re', 'れ');
//kanae.set('we', 'ゑ'); //outdated character

hiraO.set('o', 'お');
hiraO.set('ko', 'こ');
hiraO.set('so', 'そ');
hiraO.set('to', 'と');
hiraO.set('no', 'の');
hiraO.set('ho', 'ほ');
hiraO.set('mo', 'も');
hiraO.set('ro', 'ろ');
hiraO.set('yo', 'よ');
hiraO.set('wo', 'を');

hiraN.set('n', 'ん');

let prevChars = offCharacterState

const getHiraganaMap = (characters) => { 
    let hiraganaMap = new Map()

    for (const char in characters) {
        if(prevChars[char] !== characters[char] 
            || char === 'da' || char === 'ha' || char === 'yo') {
            const mapToMerge = characters[char] ? mapForChar(char, characters) : swap(mapForChar(char, characters))
            hiraganaMap = new Map([...hiraganaMap, ...mapToMerge])
        }
    }

    prevChars = characters;

    return hiraganaMap;
}

const mapForChar = (char, characters) => {
    
    switch (char) {
        case 'n':
            return hiraN;
        case 'a':
            return hiraA;
        case 'i':
            return hiraI
        case 'u':
            return hiraU;
        case 'o':
            return hiraO;
        case 'e':
            return hiraE;
        case 'da':
            return new Map([...generateHiraDaA(characters), ...generateHiraDaI(characters),
                            ...generateHiraDaU(characters), ...generateHiraDaE(characters),
                            ...generateHiraDaO(characters)]);
        case 'ha':
            return new Map([...generateHiraHaA(characters), ...generateHiraHaI(characters),
                            ...generateHiraHaU(characters), ...generateHiraHaE(characters),
                            ...generateHiraHaO(characters)]);
        case 'yo':
            return new Map([...generateHiraYoA(characters), ...generateHiraYoO(characters),
                            ...generateHiraYoU(characters)]);
        default:
            return hiraN;
    }
}
