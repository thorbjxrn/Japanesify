import {browser} from 'webextension-polyfill-ts';

export const getCurrentTabId = async (): Promise<number> => {
  const currentTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return currentTab[0].id || 1;
};
