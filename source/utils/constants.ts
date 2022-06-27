import {JapanesifyState} from './types';

export const hiraganaMaps = {
  n: new Map([['n', 'ん']]),
  a: new Map([
    ['wa', 'わ'],
    ['ra', 'ら'],
    ['ya', 'や'],
    ['ma', 'ま'],
    ['ha', 'は'],
    ['na', 'な'],
    ['ta', 'た'],
    ['sa', 'さ'],
    ['ka', 'か'],
    ['a', 'あ'],
  ]),
  i: new Map([
    ['ri', 'り'],
    ['mi', 'み'],
    ['ni', 'に'],
    ['shi', 'し'],
    ['chi', 'ち'],
    ['hi', 'ひ'],
    ['ki', 'き'],
    ['i', 'い'],
  ]),
  u: new Map([
    ['tsu', 'つ'],
    ['su', 'す'],
    ['nu', 'ぬ'],
    ['fu', 'ふ'],
    ['mu', 'む'],
    ['ru', 'る'],
    ['yu', 'ゆ'],
    ['ku', 'く'],
    ['u', 'う'],
  ]),
  e: new Map([
    ['re', 'れ'],
    ['me', 'め'],
    ['he', 'へ'],
    ['ne', 'ね'],
    ['te', 'て'],
    ['se', 'せ'],
    ['ke', 'け'],
    ['e', 'え'],
  ]),
  o: new Map([
    ['wo', 'を'],
    ['yo', 'よ'],
    ['ro', 'ろ'],
    ['mo', 'も'],
    ['ho', 'ほ'],
    ['no', 'の'],
    ['to', 'と'],
    ['so', 'そ'],
    ['ko', 'こ'],
    ['o', 'お'],
  ]),
};

export const defaultJapanesifyState: JapanesifyState = {
  enabled: false,
  n: false,
  a: false,
  i: false,
  u: false,
  e: false,
  o: false,
};

export const JAPANESIFY_STATE = 'JapanesifyState';
