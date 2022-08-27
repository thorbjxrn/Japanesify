require('jest-webextension-mock');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).chrome.runtime.id = 'fake-id';
// eslint-disable-next-line import/first
import browser from 'webextension-polyfill';

browser.tabs.onActivated = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  hasListener: jest.fn(),
  hasListeners: jest.fn(),
};

export {};
