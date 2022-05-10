import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
import { getCurrentTabId } from '../utils/utils';

export const sendMessage = async () => {
  const tabId = await getCurrentTabId()
  const state = await browser.storage.local.get('state')
  browser.tabs.sendMessage(tabId, state)
}

browser.tabs.onUpdated.addListener(sendMessage);
