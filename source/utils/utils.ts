import {browser} from 'webextension-polyfill-ts';
import {JapanesifyState} from './types';

export const JAPANESIFY_STATE = 'JapanesifyState';

export const getCurrentTabId = async (): Promise<number> => {
  const currentTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return currentTab[0].id || 1;
};

export const defaultJapanesifyState: JapanesifyState = {
  enabled: false,
  n: false,
  a: false,
  i: false,
};
