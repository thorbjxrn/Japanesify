require('jest-webextension-mock');
(globalThis as any).chrome.runtime.id = 'fake-id';
import browser from 'webextension-polyfill';

browser.tabs.onActivated = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  hasListener: jest.fn(),
  hasListeners: jest.fn(),
};

export {};
