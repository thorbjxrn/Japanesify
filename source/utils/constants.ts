import {JapanesifyState} from './types';

export const getHiraganaMaps = (state: JapanesifyState, previousState: JapanesifyState) => {
  return {
    n: new Map([['n', 'ん']]),
    a: new Map([
      ['wa', 'わ'],
      ['ra', 'ら'],
      ['ya', 'や'],
      ['ma', 'ま'],
      ['ha', 'は'],
      state.enabled && state.n ? ['んa', 'な'] : ['na', 'な'],
      ['ta', 'た'],
      ['sa', 'さ'],
      ['ka', 'か'],
      ['a', 'あ'],
    ]),
    i: new Map([
      ['ri', 'り'],
      ['mi', 'み'],
      state.enabled && state.n ? ['んi', 'に'] : ['ni', 'に'],
      ['shi', 'し'],
      ['chi', 'ち'],
      ['hi', 'ひ'],
      ['ki', 'き'],
      ['i', 'い'],
    ]),
    u: new Map([
      ['tsu', 'つ'],
      ['su', 'す'],
      state.enabled && state.n ? ['んu', 'ぬ'] : ['nu', 'ぬ'],
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
      state.enabled && state.n ? ['んe', 'ね'] : ['ne', 'ね'],
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
      state.enabled && state.n ? ['んo', 'の'] : ['no', 'の'],
      ['to', 'と'],
      ['so', 'そ'],
      ['ko', 'こ'],
      ['o', 'お'],
    ]),
    han: new Map([
      state.a ? state.enabled ? ['pあ', 'ぱ'] : ['pa', 'ぱ'] : previousState.a && previousState.han ? ['ぱ', 'pa'] : ['hmmm', 'hmmm'],
      state.i ? state.enabled ? ['pい', 'ぴ'] : ['pi', 'ぴ'] : previousState.i && previousState.han ? ['ぴ', 'pi'] : ['hmmm', 'hmmm'],
      state.u ? state.enabled ? ['pう', 'ぷ'] : ['pu', 'ぷ'] : previousState.u && previousState.han ? ['ぷ', 'pu'] : ['hmmm', 'hmmm'],
      state.e ? state.enabled ? ['pえ', 'ぺ'] : ['pe', 'ぺ'] : previousState.e && previousState.han ? ['ぺ', 'pe'] : ['hmmm', 'hmmm'],
      state.o ? state.enabled ? ['pお', 'ぽ'] : ['po', 'ぽ'] : previousState.o && previousState.han ? ['ぽ', 'po'] : ['hmmm', 'hmmm']
    ]) 
  };
};

export const defaultJapanesifyState: JapanesifyState = {
  enabled: false,
  n: false,
  a: false,
  i: false,
  u: false,
  e: false,
  o: false,
  han: false,
};

export const JAPANESIFY_STATE = 'JapanesifyState';
