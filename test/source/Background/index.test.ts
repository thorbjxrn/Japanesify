import browser, { Tabs } from 'webextension-polyfill';
import { sendMessage } from '../../../source/Background/index';
import {
  defaultJapanesifyState,
} from '../../../source/utils/constants';

describe('Background script', () => {
  const querySpy = jest.spyOn(browser.tabs, 'query');

  beforeEach(() => {
    querySpy.mockResolvedValueOnce([{ id: 2 } as Tabs.Tab]);
    window.localStorage.clear();
  });

  test('adds tabs onUpdated listener', () => {
    expect(browser.tabs.onUpdated.addListener).toBeCalledTimes(1);
  });

  test('adds tabs onActivated listener', () => {
    expect(browser.tabs.onActivated.addListener).toBeCalledTimes(1);
  });

  test('calls tabs sendMessage with local storage state', async () => {
    (browser.storage.local.get as jest.Mock).mockResolvedValueOnce({ ...defaultJapanesifyState, n: true, a: true });
    await sendMessage();

    expect(browser.tabs.sendMessage).toBeCalledWith(2, {
      ...defaultJapanesifyState,
      n: true,
      a: true,
    });
  });

  test('calls tabs sendMessage with default state', async () => {
    (browser.storage.local.get as jest.Mock).mockResolvedValueOnce(defaultJapanesifyState);
    await sendMessage();

    expect(browser.tabs.sendMessage).toBeCalledWith(2, {
      ...defaultJapanesifyState,
    });
  });
});
