import { JapanesifyState } from './types';

export const getHiraganaMaps = (
  state: JapanesifyState,
  previousState: JapanesifyState
) => {
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
    dak: new Map([
      state.a
        ? state.enabled
          ? ['gあ', 'が']
          : ['ga', 'が']
        : previousState.a
        ? ['が', 'ga']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['zあ', 'ざ']
          : ['za', 'ざ']
        : previousState.a
        ? ['ざ', 'za']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['dあ', 'だ']
          : ['da', 'だ']
        : previousState.a
        ? ['だ', 'da']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['bあ', 'ば']
          : ['ba', 'ば']
        : previousState.a
        ? ['ば', 'ba']
        : ['', ''],
      state.i
        ? state.enabled
          ? ['gい', 'ぎ']
          : ['gi', 'ぎ']
        : previousState.i
        ? ['ぎ', 'gi']
        : ['', ''],
      state.i
        ? state.enabled
          ? ['djい', 'ぢ']
          : ['dji', 'ぢ']
        : previousState.i
        ? ['ぢ', 'dji']
        : ['', ''],
      state.i
        ? state.enabled
          ? ['jい', 'じ']
          : ['ji', 'じ']
        : previousState.i
        ? ['じ', 'ji']
        : ['', ''],
      state.i
        ? state.enabled
          ? ['bい', 'び']
          : ['bi', 'び']
        : previousState.i
        ? ['び', 'bi']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['gう', 'ぐ']
          : ['gu', 'ぐ']
        : previousState.u
        ? ['ぐ', 'gu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['dzう', 'づ']
          : ['dzu', 'づ']
        : previousState.u
        ? ['づ', 'dzu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['zう', 'ず']
          : ['zu', 'ず']
        : previousState.u
        ? ['ず', 'zu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['bう', 'ぶ']
          : ['bu', 'ぶ']
        : previousState.u
        ? ['ぶ', 'bu']
        : ['', ''],
      state.e
        ? state.enabled
          ? ['gえ', 'げ']
          : ['ge', 'げ']
        : previousState.e
        ? ['げ', 'ge']
        : ['', ''],
      state.e
        ? state.enabled
          ? ['zえ', 'ぜ']
          : ['ze', 'ぜ']
        : previousState.e
        ? ['ぜ', 'ze']
        : ['', ''],
      state.e
        ? state.enabled
          ? ['dえ', 'で']
          : ['de', 'で']
        : previousState.e
        ? ['で', 'de']
        : ['', ''],
      state.e
        ? state.enabled
          ? ['bえ', 'べ']
          : ['be', 'べ']
        : previousState.e
        ? ['べ', 'be']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['gお', 'ご']
          : ['go', 'ご']
        : previousState.o
        ? ['ご', 'go']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['zお', 'ぞ']
          : ['zo', 'ぞ']
        : previousState.o
        ? ['ぞ', 'zo']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['dお', 'ど']
          : ['do', 'ど']
        : previousState.o
        ? ['ど', 'do']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['bお', 'ぼ']
          : ['bo', 'ぼ']
        : previousState.o
        ? ['ぼ', 'bo']
        : ['', ''],
    ]),
    han: new Map([
      state.a
        ? state.enabled
          ? ['pあ', 'ぱ']
          : ['pa', 'ぱ']
        : previousState.a
        ? ['ぱ', 'pa']
        : ['', ''],
      state.i
        ? state.enabled
          ? ['pい', 'ぴ']
          : ['pi', 'ぴ']
        : previousState.i
        ? ['ぴ', 'pi']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['pう', 'ぷ']
          : ['pu', 'ぷ']
        : previousState.u
        ? ['ぷ', 'pu']
        : ['', ''],
      state.e
        ? state.enabled
          ? ['pえ', 'ぺ']
          : ['pe', 'ぺ']
        : previousState.e
        ? ['ぺ', 'pe']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['pお', 'ぽ']
          : ['po', 'ぽ']
        : previousState.o
        ? ['ぽ', 'po']
        : ['', ''],
    ]),
    yoon: new Map([
      state.a
        ? state.enabled
          ? ['kや', 'きゃ']
          : ['kya', 'kiゃ']
        : previousState.a
        ? ['きゃ', 'kya']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['sは', 'しゃ']
          : ['sha', 'shiゃ']
        : previousState.a
        ? ['しゃ', 'sha']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['cは', 'ちゃ']
          : ['cha', 'chiゃ']
        : previousState.a
        ? ['ちゃ', 'cha']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['nや', 'にゃ']
          : ['nya', 'niゃ']
        : previousState.a
        ? ['にゃ', 'nya']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['hや', 'ひゃ']
          : ['hya', 'hiゃ']
        : previousState.a
        ? ['ひゃ', 'hya']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['mや', 'みゃ']
          : ['mya', 'miゃ']
        : previousState.a
        ? ['みゃ', 'mya']
        : ['', ''],
      state.a
        ? state.enabled
          ? ['rや', 'りゃ']
          : ['rya', 'riゃ']
        : previousState.a
        ? ['りゃ', 'rya']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['kよ', 'きょ']
          : ['kyo', 'kiょ']
        : previousState.o
        ? ['きょ', 'kyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['sほ', 'しょ']
          : ['sho', 'shiょ']
        : previousState.o
        ? ['しょ', 'sho']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['cほ', 'ちょ']
          : ['cho', 'chiょ']
        : previousState.o
        ? ['ちょ', 'cho']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['nよ', 'にょ']
          : ['nyo', 'niょ']
        : previousState.o
        ? ['にょ', 'nyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['hよ', 'ひょ']
          : ['hyo', 'hiょ']
        : previousState.o
        ? ['ひょ', 'hyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['mよ', 'みょ']
          : ['myo', 'miょ']
        : previousState.o
        ? ['みょ', 'myo']
        : ['', ''],
      state.o
        ? state.enabled
          ? ['rよ', 'りょ']
          : ['ryo', 'riょ']
        : previousState.o
        ? ['りょ', 'ryo']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['kゆ', 'きゅ']
          : ['kyu', 'kiゅ']
        : previousState.u
        ? ['きゅ', 'kyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['shう', 'しゅ']
          : ['shu', 'shiゅ']
        : previousState.u
        ? ['しゅ', 'shu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['chう', 'ちゅ']
          : ['chu', 'chiゅ']
        : previousState.u
        ? ['ちゅ', 'chu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['nゆ', 'にゅ']
          : ['nyu', 'niゅ']
        : previousState.u
        ? ['にゅ', 'nyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['hゆ', 'ひゅ']
          : ['hyu', 'hiゅ']
        : previousState.u
        ? ['ひゅ', 'hyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['mゆ', 'みゅ']
          : ['myu', 'miゅ']
        : previousState.u
        ? ['みゅ', 'myu']
        : ['', ''],
      state.u
        ? state.enabled
          ? ['rゆ', 'りゅ']
          : ['ryu', 'riゅ']
        : previousState.u
        ? ['りゅ', 'ryu']
        : ['', ''],
    ]),
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
  dak: false,
  han: false,
  yoon: false,
};

export const JAPANESIFY_STATE = 'JapanesifyState';
