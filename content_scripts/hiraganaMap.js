/*
 * This file contains the Map of word --> hiragana substitutions.
 */

const hiraA = new Map();
const hiraI = new Map();
const hiraO = new Map();
const hiraU = new Map();
const hiraE = new Map();
const hiraN = new Map();

const hiraDaA = new Map();
const hiraDaI = new Map();
const hiraDaU = new Map();
const hiraDaE = new Map();
const hiraDaO = new Map();

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

hiraDaA.set('ga', 'が'); hiraDaA.set('gあ', 'が');
hiraDaI.set('gi', 'ぎ'); hiraDaI.set('gい', 'ぎ');
hiraDaU.set('gu', 'ぐ'); hiraDaU.set('gう', 'ぐ');
hiraDaE.set('ge', 'げ'); hiraDaE.set('gえ', 'げ');
hiraDaO.set('go', 'ご'); hiraDaO.set('gお', 'ご');

hiraDaA.set('za', 'ざ'); hiraDaA.set('zあ', 'ざ');
hiraDaI.set('ji', 'じ'); hiraDaI.set('jい', 'じ');
hiraDaU.set('zu', 'ず'); hiraDaU.set('zう', 'ず');
hiraDaE.set('ze', 'ぜ'); hiraDaE.set('zえ', 'ぜ');
hiraDaO.set('zo', 'ぞ'); hiraDaO.set('zお', 'ぞ');

hiraDaA.set('da', 'だ');  hiraDaA.set('dあ',  'だ');
hiraDaI.set('dji', 'ぢ'); hiraDaI.set('djい', 'ぢ');
hiraDaU.set('dzu', 'づ'); hiraDaU.set('dzう', 'づ');
hiraDaE.set('de', 'で');  hiraDaE.set('dえ',  'で');
hiraDaO.set('do', 'ど');  hiraDaO.set('dお',  'ど');

hiraDaA.set('ba', 'ば'); hiraDaA.set('bあ', 'ば');
hiraDaI.set('bi', 'び'); hiraDaI.set('bい', 'び');
hiraDaU.set('bu', 'ぶ'); hiraDaU.set('bう', 'ぶ');
hiraDaE.set('be', 'べ'); hiraDaE.set('bえ', 'べ');
hiraDaO.set('bo', 'ぼ'); hiraDaO.set('bお', 'ぼ');

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

const getHiraganaMap = (characters) => { 
    let hiraganaMap = new Map()

    for (const char in characters) {
        const mapToMerge = characters[char] ? mapForChar(char, characters) : swap(mapForChar(char, characters))
        hiraganaMap = new Map([...hiraganaMap, ...mapToMerge])
    }

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
            let hiraDa = new Map();
            if(characters['a'])
                hiraDa = new Map([...hiraDa, ...hiraDaA])
            if(characters['i'])
                hiraDa = new Map([...hiraDa, ...hiraDaI])
            if(characters['u'])
                hiraDa = new Map([...hiraDa, ...hiraDaU])
            if(characters['o'])
                hiraDa = new Map([...hiraDa, ...hiraDaO])
            if(characters['e'])
                hiraDa = new Map([...hiraDa, ...hiraDaE])
            return hiraDa;
        case 'ha':
            return hiraHa;
        case 'yo':
            return hiraYo;
        default:
            return hiraN;
    }
}