
export const kanas = ['hiragana', 'katakana'] as const

export type JapanesifyState = {
  enabled: boolean;
  kana: typeof kanas[number];
  n: boolean;
  a: boolean;
  i: boolean;
  u: boolean;
  e: boolean;
  o: boolean;
  dak: boolean;
  han: boolean;
  yoon: boolean;
};
