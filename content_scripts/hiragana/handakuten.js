// Handakuten

const hiraHaA = new Map();
const hiraHaI = new Map();
const hiraHaU = new Map();
const hiraHaE = new Map();
const hiraHaO = new Map();

const generateHiraHaA = (characters) => {
    let chars = new Map();
    hiraHaA.set('pa', 'ぱ'); hiraHaA.set('pあ', 'ぱ'); 
    if(characters['ha']){
        // if 'ha' and 'a' are selected all is good return the map.
        if(characters['a']) { chars = new Map([...hiraHaA]) }
        // if 'ha' is selected but 'a' isn't we remove keys
        // that contain 'あ' to force the conversion to go
        // from 'ぱ' to 'pa' enforcing the off 'a'.
        else {
            hiraHaA.delete('pあ');
            chars = new Map([...swap(hiraHaA)])
        }
    }
    else {
        // if 'ha' is not selected but 'a' is we remove keys
        // that contain 'a' to force the conversion to go
        // from 'ぱ' to 'pあ' enforcing the on 'a'.
        characters['a'] ? 
            hiraHaA.delete('pa') : 
            // if 'ha' is selected but 'a' isn't we remove keys
            // that contain 'あ' to force the conversion to go
            // from 'ぱ' to 'pa' enforcing the off 'a'.
            hiraHaA.delete('pあ');
        chars = new Map([...hiraHaA])
    }
    return chars;
}

const generateHiraHaI = (characters) => {
    let chars = new Map();
    hiraHaI.clear();
    hiraHaI.set('pi', 'ぴ'); hiraHaI.set('pい', 'ぴ');
    if(characters['ha']){
        if(characters['i']) { chars = new Map([...hiraHaI]) }
        else {
            hiraHaI.delete('pい');
            chars = new Map([...swap(hiraHaI)])
        }
    }
    else {
        characters['i'] ? hiraHaI.delete('pi') : hiraHaI.delete('pい');
        chars = new Map([...hiraHaI])
    }
    return chars;
}

const generateHiraHaU = (characters) => {
    let chars = new Map();
    hiraHaU.clear();
    hiraHaU.set('pu', 'ぷ'); hiraHaU.set('pう', 'ぷ');
    if(characters['ha']){
        if(characters['u']) { chars = new Map([...hiraHaU]) }
        else {
            hiraHaU.delete('pう');
            chars = new Map([...swap(hiraHaU)])
        }
    }
    else {
        characters['u'] ? hiraHaU.delete('pu') : hiraHaU.delete('pう');
        chars = new Map([...hiraHaU])
    }
    return chars;
}

const generateHiraHaE = (characters) => {
    let chars = new Map();
    hiraHaE.clear();
    hiraHaE.set('pe', 'ぺ'); hiraHaE.set('pえ', 'ぺ');
    if(characters['ha']){
        if(characters['e']) { chars = new Map([...hiraHaE]) }
        else {
            hiraHaE.delete('pえ');
            chars = new Map([...swap(hiraHaE)])
        }
    }
    else {
        characters['e'] ? hiraHaE.delete('pe') : hiraHaE.delete('pえ');
        chars = new Map([...hiraHaE])
    }
    return chars;
}

const generateHiraHaO = (characters) => {
    let chars = new Map();
    hiraHaO.clear();
    hiraHaO.set('po', 'ぽ'); hiraHaO.set('pお', 'ぽ');
    if(characters['ha']){
        if(characters['o']) { chars = new Map([...hiraHaO]) }
        else {
            hiraHaO.delete('pお');
            chars = new Map([...swap(hiraHaO)])
        }
    }
    else {
        characters['o'] ? hiraHaO.delete('po') : hiraHaO.delete('pお');
        chars = new Map([...hiraHaO])
    }
    return chars;
}
// Handakuten