import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
import { defaultJapanesifyState, JAPANESIFY_STATE } from '../utils/constants';
import {
  getCurrentTabId,
} from '../utils/utils';

export const sendMessage = async (): Promise<void> => {
  const tabId = await getCurrentTabId();
  const state = JSON.parse(
    window.localStorage.getItem(JAPANESIFY_STATE) ||
      JSON.stringify(defaultJapanesifyState)
  );
  browser.tabs.sendMessage(tabId, state);
};

browser.tabs.onUpdated.addListener(sendMessage);
browser.tabs.onActivated.addListener(sendMessage);
