import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
import { defaultJapanesifyState, getCurrentTabId, JAPANESIFY_STATE } from '../utils/utils';

export const sendMessage = async () => {
  const tabId = await getCurrentTabId()
  const state = JSON.parse(window.localStorage.getItem(JAPANESIFY_STATE)!) || defaultJapanesifyState
  browser.tabs.sendMessage(tabId, state)
}

browser.tabs.onUpdated.addListener(sendMessage);
browser.tabs.onActivated.addListener(sendMessage);
