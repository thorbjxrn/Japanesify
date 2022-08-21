import { JapanesifyState } from './types';

export const getHiraganaMaps = (
  state: JapanesifyState,
  previousState: JapanesifyState
) => {
  return {
    n: new Map([
      previousState.enabled &&
      previousState.n &&
      previousState.kana === 'katakana'
        ? ['ン', 'ん'] : ['n', 'ん']
    ]),
    a: new Map([
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['ワ', 'わ'] : ['wa', 'わ'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['ラ', 'ら'] : ['ra', 'ら'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['ヤ', 'や'] : ['ya', 'や'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['マ', 'ま'] : ['ma', 'ま'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['ハ', 'は'] : ['ha', 'は'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['ナ', 'な'] : state.enabled && state.n ? ['んa', 'な'] : ['na', 'な'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['タ', 'た'] : ['ta', 'た'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['サ', 'さ'] : ['sa', 'さ'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['カ', 'か'] : ['ka', 'か'],
      previousState.enabled && previousState.a && previousState.kana === 'katakana' ? ['ア', 'あ'] : ['a', 'あ'],
    ]),
    i: new Map([
      previousState.enabled && previousState.i && previousState.kana === 'katakana' ? ['リ', 'り'] : ['ri', 'り'],
      previousState.enabled && previousState.i && previousState.kana === 'katakana' ? ['ミ', 'み'] : ['mi', 'み'],
      previousState.enabled && previousState.i && previousState.kana === 'katakana' ? ['ニ', 'に'] : state.enabled && state.n ? ['んi', 'に'] : ['ni', 'に'],
      previousState.enabled && previousState.i && previousState.kana === 'katakana' ? ['シ', 'し'] : ['shi', 'し'],
      previousState.enabled && previousState.i && previousState.kana === 'katakana' ? ['チ', 'ち'] : ['chi', 'ち'],
      previousState.enabled && previousState.i && previousState.kana === 'katakana' ? ['ヒ', 'ひ'] : ['hi', 'ひ'],
      previousState.enabled && previousState.i && previousState.kana === 'katakana' ? ['キ', 'き'] : ['ki', 'き'],
      previousState.enabled && previousState.i && previousState.kana === 'katakana' ? ['イ', 'い'] : ['i', 'い'],
    ]),
    u: new Map([
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['ツ', 'つ'] : ['tsu', 'つ'],
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['ス', 'す'] : ['su', 'す'],
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['ヌ', 'ぬ'] : state.enabled && state.n ? ['んu', 'ぬ'] : ['nu', 'ぬ'],
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['フ', 'ふ'] : ['fu', 'ふ'],
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['ム', 'む'] : ['mu', 'む'],
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['ル', 'る'] : ['ru', 'る'],
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['ユ', 'ゆ'] : ['yu', 'ゆ'],
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['ク', 'く'] : ['ku', 'く'],
      previousState.enabled && previousState.u && previousState.kana === 'katakana' ? ['ウ', 'う'] : ['u', 'う'],
    ]),
    e: new Map([
      previousState.enabled && previousState.e && previousState.kana === 'katakana' ? ['レ', 'れ'] : ['re', 'れ'],
      previousState.enabled && previousState.e && previousState.kana === 'katakana' ? ['メ', 'め'] : ['me', 'め'],
      previousState.enabled && previousState.e && previousState.kana === 'katakana' ? ['ヘ', 'へ'] : ['he', 'へ'],
      previousState.enabled && previousState.e && previousState.kana === 'katakana' ? ['ネ', 'ね'] : state.enabled && state.n ? ['んe', 'ね'] : ['ne', 'ね'],
      previousState.enabled && previousState.e && previousState.kana === 'katakana' ? ['テ', 'て'] : ['te', 'て'],
      previousState.enabled && previousState.e && previousState.kana === 'katakana' ? ['セ', 'せ'] : ['se', 'せ'],
      previousState.enabled && previousState.e && previousState.kana === 'katakana' ? ['ケ', 'け'] : ['ke', 'け'],
      previousState.enabled && previousState.e && previousState.kana === 'katakana' ? ['エ', 'え'] : ['e', 'え'],
    ]),
    o: new Map([
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['ヲ', 'を'] : ['wo', 'を'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['ヨ', 'よ'] : ['yo', 'よ'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['ロ', 'ろ'] : ['ro', 'ろ'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['モ', 'も'] : ['mo', 'も'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['ホ', 'ほ'] : ['ho', 'ほ'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['ノ', 'の'] : state.enabled && state.n ? ['んo', 'の'] : ['no', 'の'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['ト', 'と'] : ['to', 'と'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['ソ', 'そ'] : ['so', 'そ'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['コ', 'こ'] : ['ko', 'こ'],
      previousState.enabled && previousState.o && previousState.kana === 'katakana' ? ['オ', 'お'] : ['o', 'お'],
    ]),
    dak: new Map([
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.a
            ? ['ガ', 'が'] 
            : ['gあ', 'が']
          : ['ga', 'が']
        : previousState.a
        ? ['が', 'ga']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.a
            ? ['ザ', 'ざ'] 
            : ['zあ', 'ざ']
          : ['za', 'ざ']
        : previousState.a
        ? ['ざ', 'za']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.a
            ? ['ダ', 'だ'] 
            : ['dあ', 'だ']
          : ['da', 'だ']
        : previousState.a
        ? ['だ', 'da']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.a
            ? ['バ', 'ば'] 
            : ['bあ', 'ば']
          : ['ba', 'ば']
        : previousState.a
        ? ['ば', 'ba']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.i
            ? ['ギ', 'ぎ'] 
            : ['gい', 'ぎ']
          : ['gi', 'ぎ']
        : previousState.i
        ? ['ぎ', 'gi']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.i
            ? ['ヂ', 'ぢ'] 
            : ['djい', 'ぢ']
          : ['dji', 'ぢ']
        : previousState.i
        ? ['ぢ', 'dji']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.i
            ? ['ジ', 'じ'] 
            : ['jい', 'じ']
          : ['ji', 'じ']
        : previousState.i
        ? ['じ', 'ji']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.i
            ? ['ビ', 'び'] 
            : ['bい', 'び']
          : ['bi', 'び']
        : previousState.i
        ? ['び', 'bi']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.u
            ? ['グ', 'ぐ'] 
            : ['gう', 'ぐ']
          : ['gu', 'ぐ']
        : previousState.u
        ? ['ぐ', 'gu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.u
            ? ['ヅ', 'づ'] 
            : ['dzう', 'づ']
          : ['dzu', 'づ']
        : previousState.u
        ? ['づ', 'dzu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.u
            ? ['ズ', 'ず'] 
            : ['zう', 'ず']
          : ['zu', 'ず']
        : previousState.u
        ? ['ず', 'zu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.u
            ? ['ブ', 'ぶ'] 
            : ['bう', 'ぶ']
          : ['bu', 'ぶ']
        : previousState.u
        ? ['ぶ', 'bu']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.e
            ? ['ゲ', 'げ'] 
            : ['gえ', 'げ']
          : ['ge', 'げ']
        : previousState.e
        ? ['げ', 'ge']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.e
            ? ['ゼ', 'ぜ'] 
            : ['zえ', 'ぜ']
          : ['ze', 'ぜ']
        : previousState.e
        ? ['ぜ', 'ze']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.e
            ? ['デ', 'で'] 
            : ['dえ', 'で']
          : ['de', 'で']
        : previousState.e
        ? ['で', 'de']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.e
            ? ['ベ', 'べ'] 
            : ['bえ', 'べ']
          : ['be', 'べ']
        : previousState.e
        ? ['べ', 'be']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.o
            ? ['ゴ', 'ご'] 
            : ['gお', 'ご']
          : ['go', 'ご']
        : previousState.o
        ? ['ご', 'go']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.o
            ? ['ゾ', 'ぞ'] 
            : ['zお', 'ぞ']
          : ['zo', 'ぞ']
        : previousState.o
        ? ['ぞ', 'zo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.o
            ? ['ド', 'ど'] 
            : ['dお', 'ど']
          : ['do', 'ど']
        : previousState.o
        ? ['ど', 'do']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.o
            ? ['ボ', 'ぼ'] 
            : ['bお', 'ぼ']
          : ['bo', 'ぼ']
        : previousState.o
        ? ['ぼ', 'bo']
        : ['', ''],
    ]),
    han: new Map([
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.a && previousState.kana === 'katakana' 
            ? ['パ', 'ぱ'] 
            : ['pあ', 'ぱ']
          : ['pa', 'ぱ']
        : previousState.a
        ? ['ぱ', 'pa']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.i && previousState.kana === 'katakana' 
            ? ['ピ', 'ぴ'] 
            : ['pい', 'ぴ']
          : ['pi', 'ぴ']
        : previousState.i
        ? ['ぴ', 'pi']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.u && previousState.kana === 'katakana' 
            ? ['プ', 'ぷ'] 
            : ['pう', 'ぷ']
          : ['pu', 'ぷ']
        : previousState.u
        ? ['ぷ', 'pu']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.e
            ? ['ペ', 'ぺ'] 
            : ['pえ', 'ぺ']
          : ['pe', 'ぺ']
        : previousState.e
        ? ['ぺ', 'pe']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'katakana' && previousState.o
            ? ['ポ', 'ぽ'] 
            : ['pお', 'ぽ']
          : ['po', 'ぽ']
        : previousState.o
        ? ['ぽ', 'po']
        : ['', ''],
    ]),
    yoon: new Map([
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.a && previousState.kana === 'katakana' 
            ? ['キャ', 'きゃ'] 
            : ['kや', 'きゃ']
          : ['kya', 'kiゃ']
        : previousState.a
        ? ['きゃ', 'kya']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.a && previousState.kana === 'katakana' 
            ? ['シャ', 'しゃ'] 
            : ['sは', 'しゃ']
          : ['sha', 'shiゃ']
        : previousState.a
        ? ['しゃ', 'sha']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.a && previousState.kana === 'katakana' 
            ? ['チャ', 'ちゃ'] 
            : ['cは', 'ちゃ']
          : ['cha', 'chiゃ']
        : previousState.a
        ? ['ちゃ', 'cha']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.a && previousState.kana === 'katakana' 
            ? ['ニャ', 'にゃ'] 
            : state.n ? ['んや', 'にゃ'] : ['nや', 'にゃ']
          : ['nya', 'niゃ']
        : previousState.a
        ? ['にゃ', 'nya']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.a && previousState.kana === 'katakana' 
            ? ['ヒャ', 'ひゃ'] 
            : ['hや', 'ひゃ']
          : ['hya', 'hiゃ']
        : previousState.a
        ? ['ひゃ', 'hya']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.a && previousState.kana === 'katakana' 
            ? ['ミャ', 'みゃ'] 
            : ['mや', 'みゃ']
          : ['mya', 'miゃ']
        : previousState.a
        ? ['みゃ', 'mya']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.a && previousState.kana === 'katakana' 
            ? ['リャ', 'りゃ'] 
            : ['rや', 'りゃ']
          : ['rya', 'riゃ']
        : previousState.a
        ? ['りゃ', 'rya']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.o && previousState.kana === 'katakana' 
            ? ['キョ', 'きょ'] 
            : ['kよ', 'きょ']
          : ['kyo', 'kiょ']
        : previousState.o
        ? ['きょ', 'kyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.o && previousState.kana === 'katakana' 
            ? ['ショ', 'しょ'] 
            : ['sほ', 'しょ']
          : ['sho', 'shiょ']
        : previousState.o
        ? ['しょ', 'sho']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.o && previousState.kana === 'katakana' 
            ? ['チョ', 'ちょ'] 
            : ['cほ', 'ちょ']
          : ['cho', 'chiょ']
        : previousState.o
        ? ['ちょ', 'cho']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.o && previousState.kana === 'katakana' 
            ? ['ニョ', 'にょ'] 
            : state.n ? ['んよ', 'にょ'] : ['nよ', 'にょ']
          : ['nyo', 'niょ']
        : previousState.o
        ? ['にょ', 'nyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.o && previousState.kana === 'katakana' 
            ? ['ヒョ', 'ひょ'] 
            : ['hよ', 'ひょ']
          : ['hyo', 'hiょ']
        : previousState.o
        ? ['ひょ', 'hyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.o && previousState.kana === 'katakana' 
            ? ['ミョ', 'みょ'] 
            : ['mよ', 'みょ']
          : ['myo', 'miょ']
        : previousState.o
        ? ['みょ', 'myo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.o && previousState.kana === 'katakana' 
            ? ['リョ', 'りょ'] 
            : ['rよ', 'りょ']
          : ['ryo', 'riょ']
        : previousState.o
        ? ['りょ', 'ryo']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.u && previousState.kana === 'katakana' 
            ? ['キュ', 'きゅ'] 
            : ['kゆ', 'きゅ']
          : ['kyu', 'kiゅ']
        : previousState.u
        ? ['きゅ', 'kyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.u && previousState.kana === 'katakana' 
            ? ['シュ', 'しゅ'] 
            : ['shう', 'しゅ']
          : ['shu', 'shiゅ']
        : previousState.u
        ? ['しゅ', 'shu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.u && previousState.kana === 'katakana' 
            ? ['チュ', 'ちゅ'] 
            : ['chう', 'ちゅ']
          : ['chu', 'chiゅ']
        : previousState.u
        ? ['ちゅ', 'chu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.u && previousState.kana === 'katakana' 
            ? ['ニュ', 'にゅ'] 
            : state.n ? ['んゆ', 'にゅ'] : ['nゆ', 'にゅ']
          : ['nyu', 'niゅ']
        : previousState.u
        ? ['にゅ', 'nyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.u && previousState.kana === 'katakana' 
            ? ['ヒュ', 'ひゅ'] 
            : ['hゆ', 'ひゅ']
          : ['hyu', 'hiゅ']
        : previousState.u
        ? ['ひゅ', 'hyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.u && previousState.kana === 'katakana' 
            ? ['ミュ', 'みゅ'] 
            : ['mゆ', 'みゅ']
          : ['myu', 'miゅ']
        : previousState.u
        ? ['みゅ', 'myu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.u && previousState.kana === 'katakana' 
            ? ['リュ', 'りゅ'] 
            : ['rゆ', 'りゅ']
          : ['ryu', 'riゅ']
        : previousState.u
        ? ['りゅ', 'ryu']
        : ['', ''],
    ]),
  };
};

export const getKatakanaMaps = (
  state: JapanesifyState,
  previousState: JapanesifyState
) => {
  const map = {
    n: new Map([
      previousState.enabled && 
      previousState.n &&
      previousState.kana === 'hiragana'
        ? ['ん', 'ン']
        : ['n', 'ン'],
    ]),
    a: new Map([
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['わ', 'ワ'] : ['wa', 'ワ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['ら', 'ラ'] : ['ra', 'ラ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['や', 'ヤ'] : ['ya', 'ヤ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['ま', 'マ'] : ['ma', 'マ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['は', 'ハ'] : ['ha', 'ハ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana'
        ? ['な', 'ナ']
        : state.enabled && state.n
        ? ['ンa', 'ナ']
        : ['na', 'ナ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['た', 'タ'] : ['ta', 'タ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['さ', 'サ'] : ['sa', 'サ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['か', 'カ'] : ['ka', 'カ'],
      previousState.enabled && previousState.a && previousState.kana === 'hiragana' ? ['あ', 'ア'] : ['a', 'ア'],
    ]),
    i: new Map([
      previousState.enabled && previousState.i && previousState.kana === 'hiragana' ? ['り', 'リ'] : ['ri', 'リ'],
      previousState.enabled && previousState.i && previousState.kana === 'hiragana' ? ['み', 'ミ'] : ['mi', 'ミ'],
      previousState.enabled && previousState.i && previousState.kana === 'hiragana'
        ? ['に', 'ニ']
        : state.enabled && state.n
        ? ['ンi', 'ニ']
        : ['ni', 'ニ'],
      previousState.enabled && previousState.i && previousState.kana === 'hiragana' ? ['し', 'シ'] : ['shi', 'シ'],
      previousState.enabled && previousState.i && previousState.kana === 'hiragana' ? ['ち', 'チ'] : ['chi', 'チ'],
      previousState.enabled && previousState.i && previousState.kana === 'hiragana' ? ['ひ', 'ヒ'] : ['hi', 'ヒ'],
      previousState.enabled && previousState.i && previousState.kana === 'hiragana' ? ['き', 'キ'] : ['ki', 'キ'],
      previousState.enabled && previousState.i && previousState.kana === 'hiragana' ? ['い', 'イ'] : ['i', 'イ'],
    ]),
    u: new Map([
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['つ', 'ツ'] : ['tsu', 'ツ'],
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['す', 'ス'] : ['su', 'ス'],
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['ぬ', 'ヌ'] : state.enabled && state.n ? ['ンu', 'ヌ'] : ['nu', 'ヌ'],
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['ふ', 'フ'] : ['fu', 'フ'],
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['む', 'ム'] : ['mu', 'ム'],
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['る', 'ル'] : ['ru', 'ル'],
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['ゆ', 'ユ'] : ['yu', 'ユ'],
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['く', 'ク'] : ['ku', 'ク'],
      previousState.enabled && previousState.u && previousState.kana === 'hiragana' ? ['う', 'ウ'] : ['u', 'ウ'],
    ]),
    e: new Map([
      previousState.enabled && previousState.e && previousState.kana === 'hiragana' ? ['れ', 'レ'] : ['re', 'レ'],
      previousState.enabled && previousState.e && previousState.kana === 'hiragana' ? ['め', 'メ'] : ['me', 'メ'],
      previousState.enabled && previousState.e && previousState.kana === 'hiragana' ? ['へ', 'ヘ'] : ['he', 'ヘ'],
      previousState.enabled && previousState.e && previousState.kana === 'hiragana' ? ['ね', 'ネ'] : state.enabled && state.n ? ['ンe', 'ネ'] : ['ne', 'ネ'],
      previousState.enabled && previousState.e && previousState.kana === 'hiragana' ? ['て', 'テ'] : ['te', 'テ'],
      previousState.enabled && previousState.e && previousState.kana === 'hiragana' ? ['せ', 'セ'] : ['se', 'セ'],
      previousState.enabled && previousState.e && previousState.kana === 'hiragana' ? ['け', 'ケ'] : ['ke', 'ケ'],
      previousState.enabled && previousState.e && previousState.kana === 'hiragana' ? ['え', 'エ'] : ['e', 'エ'],
    ]),
    o: new Map([
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['を', 'ヲ'] : ['wo', 'ヲ'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['よ', 'ヨ'] : ['yo', 'ヨ'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['ろ', 'ロ'] : ['ro', 'ロ'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['も', 'モ'] : ['mo', 'モ'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['ほ', 'ホ'] : ['ho', 'ホ'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['の', 'ノ'] : state.enabled && state.n ? ['ンo', 'ノ'] : ['no', 'ノ'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['と', 'ト'] : ['to', 'ト'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['そ', 'ソ'] : ['so', 'ソ'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['こ', 'コ'] : ['ko', 'コ'],
      previousState.enabled && previousState.o && previousState.kana === 'hiragana' ? ['お', 'オ'] : ['o', 'オ'],
    ]),
    dak: new Map([
      state.a
      ? state.enabled
        ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
          ? ['が', 'ガ']
          : ['gア', 'ガ']
        : ['ga', 'ガ']
      : previousState.a
        ? ['ガ', 'ga']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['ざ', 'ザ']
            : ['zア', 'ザ']
          : ['za', 'ザ']
        : previousState.a
        ? ['ザ', 'za']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['だ', 'ダ']
            : ['dア', 'ダ']
          : ['da', 'ダ']
        : previousState.a
        ? ['ダ', 'da']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['ば', 'バ']
            : ['bア', 'バ']
          : ['ba', 'バ']
        : previousState.a
        ? ['バ', 'ba']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.i
            ? ['ぎ', 'ギ']
            : ['gイ', 'ギ']
          : ['gi', 'ギ']
        : previousState.i
        ? ['ギ', 'gi']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.i
            ? ['ぢ', 'ヂ']
            : ['djイ', 'ヂ']
          : ['dji', 'ヂ']
        : previousState.i
        ? ['ヂ', 'dji']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.i
            ? ['じ', 'ジ']
            : ['jイ', 'ジ']
          : ['ji', 'ジ']
        : previousState.i
        ? ['ジ', 'ji']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.i
            ? ['び', 'ビ']
            : ['bイ', 'ビ']
          : ['bi', 'ビ']
        : previousState.i
        ? ['ビ', 'bi']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['ぐ', 'グ']
            : ['gウ', 'グ']
          : ['gu', 'グ']
        : previousState.u
        ? ['グ', 'gu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['づ', 'ヅ']
            : ['dzウ', 'ヅ']
          : ['dzu', 'ヅ']
        : previousState.u
        ? ['ヅ', 'dzu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['ず', 'ズ']
            : ['zウ', 'ズ']
          : ['zu', 'ズ']
        : previousState.u
        ? ['ズ', 'zu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['ぶ', 'ブ']
            : ['bウ', 'ブ']
          : ['bu', 'ブ']
        : previousState.u
        ? ['ブ', 'bu']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.e
            ? ['げ', 'ゲ']
            : ['gエ', 'ゲ']
          : ['ge', 'ゲ']
        : previousState.e
        ? ['ゲ', 'ge']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.e
            ? ['ぜ', 'ゼ']
            : ['zエ', 'ゼ']
          : ['ze', 'ゼ']
        : previousState.e
        ? ['ゼ', 'ze']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.e
            ? ['で', 'デ']
            : ['dエ', 'デ']
          : ['de', 'デ']
        : previousState.e
        ? ['デ', 'de']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.e
            ? ['べ', 'ベ']
            : ['bエ', 'ベ']
          : ['be', 'ベ']
        : previousState.e
        ? ['ベ', 'be']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['ご', 'ゴ']
            : ['gオ', 'ゴ']
          : ['go', 'ゴ']
        : previousState.o
        ? ['ゴ', 'go']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['ぞ', 'ゾ']
            : ['zオ', 'ゾ']
          : ['zo', 'ゾ']
        : previousState.o
        ? ['ゾ', 'zo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['ど', 'ド']
            : ['dオ', 'ド']
          : ['do', 'ド']
        : previousState.o
        ? ['ド', 'do']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['ぼ', 'ボ']
            : ['bオ', 'ボ']
          : ['bo', 'ボ']
        : previousState.o
        ? ['ボ', 'bo']
        : ['', ''],
    ]),
    han: new Map([
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['ぱ', 'パ']
            : ['pア', 'パ']
          : ['pa', 'パ']
        : previousState.a
        ? ['パ', 'pa']
        : ['', ''],
      state.i
        ? state.enabled
          ? previousState.enabled && previousState.enabled && previousState.kana === 'hiragana' && previousState.i
            ? ['ぴ', 'ピ']
            : ['pイ', 'ピ']
          : ['pi', 'ピ']
        : previousState.i
        ? ['ピ', 'pi']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['ぷ', 'プ']
            : ['pウ', 'プ']
          : ['pu', 'プ']
        : previousState.u
        ? ['プ', 'pu']
        : ['', ''],
      state.e
        ? state.enabled
          ? previousState.enabled && previousState.enabled && previousState.kana === 'hiragana' && previousState.e
            ? ['ぺ', 'ペ']
            : ['pエ', 'ペ']
          : ['pe', 'ペ']
        : previousState.e
        ? ['ペ', 'pe']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['ぽ', 'ポ']
            : ['pオ', 'ポ']
          : ['po', 'ポ']
        : previousState.o
        ? ['ポ', 'po']
        : ['', ''],
    ]),
    yoon: new Map([
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['きゃ', 'キャ']
            : ['kヤ', 'キャ']
          : ['kya', 'kiャ']
        : previousState.a
        ? ['キャ', 'kya']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['しゃ', 'シャ']
            : ['sハ', 'シャ']
          : ['sha', 'shiャ']
        : previousState.a
        ? ['シャ', 'sha']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['ちゃ', 'チャ']
            : ['cハ', 'チャ']
          : ['cha', 'chiャ']
        : previousState.a
        ? ['チャ', 'cha']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['にゃ', 'ニャ']
            : state.n ? ['ンヤ', 'ニャ'] : ['nヤ', 'ニャ']
          : ['nya', 'niャ']
        : previousState.a
        ? ['ニャ', 'nya']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['ひゃ', 'ヒャ']
            : ['hヤ', 'ヒャ']
          : ['hya', 'hiャ']
        : previousState.a
        ? ['ヒャ', 'hya']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['みゃ', 'ミャ']
            : ['mヤ', 'ミャ']
          : ['mya', 'miャ']
        : previousState.a
        ? ['ミャ', 'mya']
        : ['', ''],
      state.a
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.a
            ? ['りゃ', 'リャ']
            : ['rヤ', 'リャ']
          : ['rya', 'riャ']
        : previousState.a
        ? ['リャ', 'rya']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['きょ', 'キョ']
            : ['kヨ', 'キョ']
          : ['kyo', 'kiョ']
        : previousState.o
        ? ['キョ', 'kyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['しょ', 'ショ']
            : ['sホ', 'ショ']
          : ['sho', 'shiョ']
        : previousState.o
        ? ['ショ', 'sho']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['ちょ', 'チョ']
            : ['cホ', 'チョ']
          : ['cho', 'chiョ']
        : previousState.o
        ? ['チョ', 'cho']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['にょ', 'ニョ']
            : state.n ? ['ンヨ', 'ニョ'] : ['nヨ', 'ニョ']
          : ['nyo', 'niョ']
        : previousState.o
        ? ['ニョ', 'nyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['ひょ', 'ヒョ']
            : ['hヨ', 'ヒョ']
          : ['hyo', 'hiョ']
        : previousState.o
        ? ['ヒョ', 'hyo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['みょ', 'ミョ']
            : ['mヨ', 'ミョ']
          : ['myo', 'miョ']
        : previousState.o
        ? ['ミョ', 'myo']
        : ['', ''],
      state.o
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.o
            ? ['りょ', 'リョ']
            : ['rヨ', 'リョ']
          : ['ryo', 'riョ']
        : previousState.o
        ? ['リョ', 'ryo']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['きゅ', 'キュ']
            : ['kユ', 'キュ']
          : ['kyu', 'kiュ']
        : previousState.u
        ? ['キュ', 'kyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['しゅ', 'シュ']
            : ['shウ', 'シュ']
          : ['shu', 'shiュ']
        : previousState.u
        ? ['シュ', 'shu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['ちゅ', 'チュ']
            : ['chウ', 'チュ']
          : ['chu', 'chiュ']
        : previousState.u
        ? ['チュ', 'chu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['にゅ', 'ニュ']
            : state.n ? ['ンユ', 'ニュ'] : ['nユ', 'ニュ']
          : ['nyu', 'niュ']
        : previousState.u
        ? ['ニュ', 'nyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['ひゅ', 'ヒュ']
            : ['hユ', 'ヒュ']
          : ['hyu', 'hiュ']
        : previousState.u
        ? ['ヒュ', 'hyu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['みゅ', 'ミュ']
            : ['mユ', 'ミュ']
          : ['myu', 'miュ']
        : previousState.u
        ? ['ミュ', 'myu']
        : ['', ''],
      state.u
        ? state.enabled
          ? previousState.enabled && previousState.kana === 'hiragana' && previousState.u
            ? ['りゅ', 'リュ']
            : ['rユ', 'リュ']
          : ['ryu', 'riュ']
        : previousState.u
        ? ['リュ', 'ryu']
        : ['', ''],
    ]), 
  }

  return map
};

export const defaultJapanesifyState: JapanesifyState = {
  enabled: false,
  kana: 'hiragana',
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
