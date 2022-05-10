import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
import { getCurrentTabId } from '../utils/utils';

export const sendMessage = async () => {
  const tabId = await getCurrentTabId()
  browser.tabs.sendMessage(tabId, {enabled: true, n: false})
}

browser.tabs.onUpdated.addListener(sendMessage);
