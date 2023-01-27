import browser from 'webextension-polyfill';
import { getCurrentTabId, getState } from '../utils/utils';

export const sendMessage = async (): Promise<void> => {
  const tabId = await getCurrentTabId();
  const state = await getState();
  
  browser.tabs.sendMessage(tabId, state);
};

browser.tabs.onUpdated.addListener(sendMessage);
browser.tabs.onActivated.addListener(sendMessage);
