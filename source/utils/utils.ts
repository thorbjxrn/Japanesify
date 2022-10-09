import browser from 'webextension-polyfill';
import { defaultJapanesifyState } from './constants';
import { JapanesifyState } from './types';

export const getCurrentTabId = async (): Promise<number> => {
  const currentTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return currentTab[0].id || 1;
};

export const getState = async (): Promise<JapanesifyState> => {
  let state = await browser.storage.local.get() as JapanesifyState
  if(!Object.keys(state).length) {
    state = defaultJapanesifyState
  }
  return state
}
