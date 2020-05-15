/*
 * This file contains the Map of word --> hiragana substitutions.
 */

const hiraA = new Map();
const hiraI = new Map();
const hiraO = new Map();
const hiraU = new Map();
const hiraE = new Map();
const hiraN = new Map();

const hiraDa = new Map();
const hiraHa = new Map();
const hiraYo = new Map();

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

//How to implement: 1. Dakuten active -> all dakuten. EASY || 2. Dakuten active only additionally selected characters BETTer

hiraDa.set('ga', 'が');
hiraDa.set('gi', 'ぎ');
hiraDa.set('gu', 'ぐ');
hiraDa.set('ge', 'げ');
hiraDa.set('go', 'ご');

hiraDa.set('za', 'ざ');
hiraDa.set('ji', 'じ');
hiraDa.set('zu', 'ず');
hiraDa.set('ze', 'ぜ');
hiraDa.set('zo', 'ぞ');

hiraDa.set('da', 'だ');
hiraDa.set('dji', 'ぢ');
hiraDa.set('dzu', 'づ');
hiraDa.set('de', 'で');
hiraDa.set('do', 'ど');

hiraDa.set('ba', 'ば');
hiraDa.set('bi', 'び');
hiraDa.set('bu', 'ぶ');
hiraDa.set('be', 'べ');
hiraDa.set('bo', 'ぼ');

hiraHa.set('pa', 'ぱ');
hiraHa.set('pu', 'ぷ');
hiraHa.set('pi', 'ぴ');
hiraHa.set('pe', 'ぺ');
hiraHa.set('po', 'ぽ');

//YOON
hiraYo.set('kya', 'きゃ');
hiraYo.set('kyu', 'きゅ');
hiraYo.set('kyo', 'きょ');

hiraYo.set('sha', 'しゃ');
hiraYo.set('shu', 'しゅ');
hiraYo.set('sho', 'しょ');

hiraYo.set('cha', 'ちゃ');
hiraYo.set('chu', 'ちゅ');
hiraYo.set('cho', 'ちょ');

hiraYo.set('nya', 'にゃ');
hiraYo.set('nyu', 'にゅ');
hiraYo.set('nyo', 'にょ');

hiraYo.set('hya', 'ひゃ');
hiraYo.set('hyu', 'ひゅ');
hiraYo.set('hyo', 'ひょ');

hiraYo.set('mya', 'みゃ');
hiraYo.set('myu', 'みゅ');
hiraYo.set('myo', 'みょ');

hiraYo.set('rya', 'りゃ');
hiraYo.set('ryu', 'りゅ');
hiraYo.set('ryo', 'りょ');

let prevCharacters = offCharacterState;

// Compares prevCharacters to new ones and adds/removes acording to users selections
const getHiraganaMap = (characters) => { 
    let hiraganaMap = new Map()

    for (const char in characters) {
        if(prevCharacters[char] !== characters[char]){
            const mapToMerge = characters[char] ? mapForChar(char) : swap(mapForChar(char))
            hiraganaMap = new Map([...hiraganaMap, ...mapToMerge])
        }
    }
    
    prevCharacters = characters;

    return hiraganaMap;
}

const mapForChar = (char) => {
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
            return hiraDa;
        case 'ha':
            return hiraHa;
        case 'yo':
            return hiraYo;
        default:
            return hiraN;
    }
}