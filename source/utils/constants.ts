import { JapanesifyState } from "./types";

export const hiraganaMaps = {
  n: new Map<string, string>([['n', 'ん']]),
  a: new Map<string, string>([
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
};

export const defaultJapanesifyState: JapanesifyState = {
  enabled: false,
  n: false,
  a: false,
  i: false,
};

export const JAPANESIFY_STATE = 'JapanesifyState';
