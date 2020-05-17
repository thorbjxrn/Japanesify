
const hiraYoA = new Map();
const hiraYoO = new Map();
const hiraYoU = new Map();

//YOON
const generateHiraYoA = (characters) => {
    //Reset map
    hiraYoA.set('kya', 'きゃ'); hiraYoA.set('kや', 'きゃ'); hiraYoA.set('kiゃ',  'きゃ');
    hiraYoA.set('sha', 'しゃ'); hiraYoA.set('sは', 'しゃ'); hiraYoA.set('shiゃ', 'しゃ');
    hiraYoA.set('cha', 'ちゃ'); hiraYoA.set('cは', 'ちゃ'); hiraYoA.set('chiゃ', 'ちゃ');
    hiraYoA.set('nya', 'にゃ'); hiraYoA.set('nや', 'にゃ'); hiraYoA.set('niゃ',  'にゃ');
    hiraYoA.set('hya', 'ひゃ'); hiraYoA.set('hや', 'ひゃ'); hiraYoA.set('hiゃ',  'ひゃ');
    hiraYoA.set('mya', 'みゃ'); hiraYoA.set('mや', 'みゃ'); hiraYoA.set('miゃ',  'みゃ');
    hiraYoA.set('rya', 'りゃ'); hiraYoA.set('rや', 'りゃ'); hiraYoA.set('riゃ',  'りゃ');
    
    let chars = new Map();

    if(characters['yo']){
        // if 'yo' and 'a' are selected all is good return the map.
        if(characters['a']) {
            chars = new Map([...hiraYoA])
        }
        // if 'yo' is selected but 'a' isn't we remove keys
        // that contain 'や' or 'ゃ' to force the conversion to go
        // from 'きゃ' to 'kya' enforcing the off 'a'.
        else {
            hiraYoA.delete('kや'); hiraYoA.delete('kiゃ');
            hiraYoA.delete('sは'); hiraYoA.delete('shiゃ');
            hiraYoA.delete('cは'); hiraYoA.delete('chiゃ');
            hiraYoA.delete('nや'); hiraYoA.delete('niゃ');
            hiraYoA.delete('hや'); hiraYoA.delete('hiゃ');
            hiraYoA.delete('mや'); hiraYoA.delete('miゃ');
            hiraYoA.delete('rや'); hiraYoA.delete('riゃ');
            
            chars = new Map([...swap(hiraYoA)])
        }
    }
    else {
        // if 'yo' is not selected but 'a' is we remove keys
        // that contain 'a' or 'ゃ' to force the conversion to go
        // from 'kya' or 'kiゃ' to 'kや' enforcing the on 'a'.
        if(characters['a']) {
            hiraYoA.delete('kya'); hiraYoA.delete('kiゃ');
            hiraYoA.delete('sha'); hiraYoA.delete('shiゃ');
            hiraYoA.delete('chi'); hiraYoA.delete('chiゃ');
            hiraYoA.delete('nya'); hiraYoA.delete('niゃ');
            hiraYoA.delete('hya'); hiraYoA.delete('hiゃ');
            hiraYoA.delete('mya'); hiraYoA.delete('miゃ');
            hiraYoA.delete('rya'); hiraYoA.delete('riゃ');
        }
        // if 'yo' is selected but 'a' isn't we remove keys
        // that contain 'や' or 'ゃ' to force the conversion to go
        // from 'きゃ' to 'kya' enforcing the off 'a'.
        else {
            hiraYoA.delete('kや');
            hiraYoA.delete('sは');
            hiraYoA.delete('cは');
            hiraYoA.delete('nや');
            hiraYoA.delete('hや');
            hiraYoA.delete('mや');
            hiraYoA.delete('rや');
        }
        chars = new Map([...hiraYoA])
    }
    return chars;
}

const generateHiraYoO = (characters) => {
    //Reset map
    hiraYoO.set('kyo', 'きょ'); hiraYoO.set('kよ', 'きょ'); hiraYoO.set('kiょ',  'きょ');
    hiraYoO.set('sho', 'しょ'); hiraYoO.set('sよ', 'しょ'); hiraYoO.set('shiょ', 'しょ');
    hiraYoO.set('cho', 'ちょ'); hiraYoO.set('cよ', 'ちょ'); hiraYoO.set('chiょ', 'ちょ');
    hiraYoO.set('nyo', 'にょ'); hiraYoO.set('nよ', 'にょ'); hiraYoO.set('niょ',  'にょ');
    hiraYoO.set('hyo', 'ひょ'); hiraYoO.set('hよ', 'ひょ'); hiraYoO.set('hiょ',  'ひょ');
    hiraYoO.set('myo', 'みょ'); hiraYoO.set('mよ', 'みょ'); hiraYoO.set('miょ',  'みょ');
    hiraYoO.set('ryo', 'りょ'); hiraYoO.set('rよ', 'りょ'); hiraYoO.set('riょ',  'りょ');
    
    let chars = new Map();

    if(characters['yo']){
        if(characters['o']) {
            chars = new Map([...hiraYoO])
        }
        else {
            hiraYoO.delete('kよ'); hiraYoO.delete('kiょ');
            hiraYoO.delete('sよ'); hiraYoO.delete('shiょ');
            hiraYoO.delete('cよ'); hiraYoO.delete('chiょ');
            hiraYoO.delete('nよ'); hiraYoO.delete('niょ');
            hiraYoO.delete('hよ'); hiraYoO.delete('hiょ');
            hiraYoO.delete('mよ'); hiraYoO.delete('miょ');
            hiraYoO.delete('rよ'); hiraYoO.delete('riょ');
            
            chars = new Map([...swap(hiraYoO)])
        }
    }
    else {
        if(characters['o']) {
            hiraYoO.delete('kyo'); hiraYoO.delete('kiょ');
            hiraYoO.delete('sho'); hiraYoO.delete('shiょ');
            hiraYoO.delete('cho'); hiraYoO.delete('chiょ');
            hiraYoO.delete('nyo'); hiraYoO.delete('niょ');
            hiraYoO.delete('hyo'); hiraYoO.delete('hiょ');
            hiraYoO.delete('myo'); hiraYoO.delete('miょ');
            hiraYoO.delete('ryo'); hiraYoO.delete('riょ');
        }
        else {
            hiraYoO.delete('kよ');
            hiraYoO.delete('sよ');
            hiraYoO.delete('cよ');
            hiraYoO.delete('nよ');
            hiraYoO.delete('hよ');
            hiraYoO.delete('mよ');
            hiraYoO.delete('rよ');
        }
        chars = new Map([...hiraYoO])
    }
    return chars;
}

const generateHiraYoU = (characters) => {
    //Reset map
    hiraYoU.set('kyu', 'きゅ'); hiraYoU.set('kゆ',  'きゅ'); hiraYoU.set('kiゅ',  'きゅ');
    hiraYoU.set('shu', 'しゅ'); hiraYoU.set('shう', 'しゅ'); hiraYoU.set('shiゅ', 'しゅ');
    hiraYoU.set('chu', 'ちゅ'); hiraYoU.set('chう', 'ちゅ'); hiraYoU.set('chiゅ', 'ちゅ');
    hiraYoU.set('nyu', 'にゅ'); hiraYoU.set('nゆ',  'にゅ'); hiraYoU.set('niゅ',  'にゅ');
    hiraYoU.set('hyu', 'ひゅ'); hiraYoU.set('hゆ',  'ひゅ'); hiraYoU.set('hiゅ',  'ひゅ');
    hiraYoU.set('myu', 'みゅ'); hiraYoU.set('mゆ',  'みゅ'); hiraYoU.set('miゅ',  'みゅ');
    hiraYoU.set('ryu', 'りゅ'); hiraYoU.set('rゆ',  'りゅ'); hiraYoU.set('riゅ',  'りゅ');
    
    let chars = new Map();

    if(characters['yo']){
        if(characters['u']) {
            chars = new Map([...hiraYoU])
        }
        else {
            hiraYoU.delete('kゆ');  hiraYoU.delete('kiゅ');
            hiraYoU.delete('shう'); hiraYoU.delete('shiゅ');
            hiraYoU.delete('chう'); hiraYoU.delete('chiゅ');
            hiraYoU.delete('nゆ');  hiraYoU.delete('niゅ');
            hiraYoU.delete('hゆ');  hiraYoU.delete('hiゅ');
            hiraYoU.delete('mゆ');  hiraYoU.delete('miゅ');
            hiraYoU.delete('rゆ');  hiraYoU.delete('riゅ');
            
            chars = new Map([...swap(hiraYoU)])
        }
    }
    else {
        if(characters['u']) {
            hiraYoU.delete('kyu'); hiraYoU.delete('kiゅ');
            hiraYoU.delete('shu'); hiraYoU.delete('shiゅ');
            hiraYoU.delete('chu'); hiraYoU.delete('chiゅ');
            hiraYoU.delete('nyu'); hiraYoU.delete('niゅ');
            hiraYoU.delete('hyu'); hiraYoU.delete('hiゅ');
            hiraYoU.delete('myu'); hiraYoU.delete('miゅ');
            hiraYoU.delete('ryu'); hiraYoU.delete('riゅ');
        }
        else {
            hiraYoU.delete('kゆ');
            hiraYoU.delete('shう');
            hiraYoU.delete('chう');
            hiraYoU.delete('nゆ');
            hiraYoU.delete('hゆ');
            hiraYoU.delete('mゆ');
            hiraYoU.delete('rゆ');
        }
        chars = new Map([...hiraYoU])
    }
    return chars;
}