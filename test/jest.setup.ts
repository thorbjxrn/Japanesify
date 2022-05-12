require('jest-webextension-mock');
import { browser } from "webextension-polyfill-ts";

browser.tabs.onActivated = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    hasListener: jest.fn(),
    hasListeners: jest.fn()
}

export {}