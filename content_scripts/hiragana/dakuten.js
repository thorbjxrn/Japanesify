// Dakuten

const hiraDaA = new Map();
const hiraDaI = new Map();
const hiraDaU = new Map();
const hiraDaE = new Map();
const hiraDaO = new Map();

/*
 * Generates dakuten for only selected vowels
 * if dakuten simbol(") is selected
 */


const generateHiraDaA = (characters) => {
    //Reset map
    hiraDaA.set('ga', 'が'); hiraDaA.set('gあ', 'が');
    hiraDaA.set('za', 'ざ'); hiraDaA.set('zあ', 'ざ');
    hiraDaA.set('da', 'だ'); hiraDaA.set('dあ', 'だ');
    hiraDaA.set('ba', 'ば'); hiraDaA.set('bあ', 'ば');
    let chars = new Map();

    if(characters['da']){
        // if 'da' and 'a' are selected all is good return the map.
        if(characters['a']) {
            chars = new Map([...hiraDaA])
        }
        // if 'da' is selected but 'a' isn't we remove keys
        // that contain 'あ' to force the conversion to go
        // from 'が' to 'ga' enforcing the off 'a'.
        else {
            hiraDaA.delete('gあ'); hiraDaA.delete('zあ');
            hiraDaA.delete('dあ'); hiraDaA.delete('bあ');
            chars = new Map([...swap(hiraDaA)])
        }
    }
    else {
        // if 'da' is not selected but 'a' is we remove keys
        // that contain 'a' to force the conversion to go
        // from 'が' to 'gあ' enforcing the on 'a'.
        if(characters['a']) {
            hiraDaA.delete('ga'); hiraDaA.delete('za');
            hiraDaA.delete('da'); hiraDaA.delete('ba');
        }
        // if 'da' is selected but 'a' isn't we remove keys
        // that contain 'あ' to force the conversion to go
        // from 'が' to 'ga' enforcing the off 'a'.
        else {
            hiraDaA.delete('gあ'); hiraDaA.delete('zあ');
            hiraDaA.delete('dあ'); hiraDaA.delete('bあ');
        }
        chars = new Map([...hiraDaA])
    }
    return chars;
}

const generateHiraDaI = (characters) => {
    let chars = new Map();
    hiraDaI.clear();
    hiraDaI.set('gi',  'ぎ');  hiraDaI.set('gい',  'ぎ');
    hiraDaI.set('ji',  'じ');  hiraDaI.set('jい',  'じ');
    hiraDaI.set('dji', 'ぢ');  hiraDaI.set('djい', 'ぢ');
    hiraDaI.set('bi',  'び');  hiraDaI.set('bい',  'び');
    if(characters['da']){
        if(characters['i']) {
            chars = new Map([...hiraDaI])
        }
        else {
            hiraDaI.delete('gい');  hiraDaI.delete('jい');
            hiraDaI.delete('djい'); hiraDaI.delete('bい');
            chars = new Map([...swap(hiraDaI)])
        }
    }
    else {
        if(characters['i']) {
            hiraDaI.delete('gi');  hiraDaI.delete('ji');
            hiraDaI.delete('dji'); hiraDaI.delete('bi');
        } 
        else {
            hiraDaI.delete('gい');  hiraDaI.delete('jい');
            hiraDaI.delete('djい'); hiraDaI.delete('bい');
        }
        chars = new Map([...hiraDaI])
    }
    return chars;
}

const generateHiraDaU = (characters) => {
    let chars = new Map();
    hiraDaU.clear();
    hiraDaU.set('gu',  'ぐ');  hiraDaU.set('gう',  'ぐ');
    hiraDaU.set('zu',  'ず');  hiraDaU.set('zう',  'ず');
    hiraDaU.set('dzu', 'づ');  hiraDaU.set('dzう', 'づ');
    hiraDaU.set('bu',  'ぶ');  hiraDaU.set('bう',  'ぶ');
    if(characters['da']){
        if(characters['u']) {
            chars = new Map([...hiraDaU])
        }
        else {
            hiraDaU.delete('gう');  hiraDaU.delete('zう');
            hiraDaU.delete('dzう'); hiraDaU.delete('bう');
            chars = new Map([...swap(hiraDaU)])
        }
    }
    else {
        if(characters['u']) {
            hiraDaU.delete('gu');  hiraDaU.delete('zu');
            hiraDaU.delete('dzu'); hiraDaU.delete('bu');
        } 
        else {
            hiraDaU.delete('gう');  hiraDaU.delete('zう');
            hiraDaU.delete('dzう'); hiraDaU.delete('bう');
        }
        chars = new Map([...hiraDaU])
    }
    return chars;
}

const generateHiraDaE = (characters) => {
    let chars = new Map();
    hiraDaE.clear();
    hiraDaE.set('ge', 'げ'); hiraDaE.set('gえ', 'げ');
    hiraDaE.set('ze', 'ぜ'); hiraDaE.set('zえ', 'ぜ');
    hiraDaE.set('de', 'で'); hiraDaE.set('dえ', 'で');
    hiraDaE.set('be', 'べ'); hiraDaE.set('bえ', 'べ');
    if(characters['da']){
        if(characters['e']) {
            chars = new Map([...hiraDaE])
        }
        else {
            hiraDaE.delete('gえ');  hiraDaE.delete('zえ');
            hiraDaE.delete('dえ');  hiraDaE.delete('bえ');
            chars = new Map([...swap(hiraDaE)])
        }
    }
    else {
        if(characters['e']) {
            hiraDaE.delete('ge'); hiraDaE.delete('ze');
            hiraDaE.delete('de'); hiraDaE.delete('be');
        } 
        else {
            hiraDaE.delete('gえ'); hiraDaE.delete('zえ');
            hiraDaE.delete('dえ'); hiraDaE.delete('bえ');
        }
        chars = new Map([...hiraDaE])
    }
    return chars;
}

const generateHiraDaO = (characters) => {
    let chars = new Map();
    hiraDaO.clear();
    hiraDaO.set('go', 'ご'); hiraDaO.set('gお', 'ご');
    hiraDaO.set('zo', 'ぞ'); hiraDaO.set('zお', 'ぞ');
    hiraDaO.set('do', 'ど'); hiraDaO.set('dお', 'ど');
    hiraDaO.set('bo', 'ぼ'); hiraDaO.set('bお', 'ぼ');
    if(characters['da']){
        if(characters['o']) {
            chars = new Map([...hiraDaO])
        }
        else {
            hiraDaO.delete('gお');  hiraDaO.delete('zお');
            hiraDaO.delete('dお');  hiraDaO.delete('bお');
            chars = new Map([...swap(hiraDaO)])
        }
    }
    else {
        if(characters['o']) {
            hiraDaO.delete('go'); hiraDaO.delete('zo');
            hiraDaO.delete('do'); hiraDaO.delete('bo');
        } 
        else {
            hiraDaO.delete('gお'); hiraDaO.delete('zお');
            hiraDaO.delete('dお'); hiraDaO.delete('bお');
        }
        chars = new Map([...hiraDaO])
    }
    return chars;
}
// Dakuten