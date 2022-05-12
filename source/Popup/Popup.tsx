import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
import { JapanesifyState } from '../utils/types';
import { defaultJapanesifyState, getCurrentTabId, japanesifyState } from '../utils/utils';

const Popup: React.FC = () => {

  const [isEnabled, setIsEnabled] = React.useState(false)
  const [nEnabled, setNEnabled] = React.useState(false)

  React.useEffect(() => {
    const state = JSON.parse(window.localStorage.getItem(japanesifyState)!) as JapanesifyState || defaultJapanesifyState
    setIsEnabled(state.enabled)
    setNEnabled(state.n)
  }, [])

  const enableOnClick = async () => {
    const tabId = await getCurrentTabId()
    browser.tabs.sendMessage(tabId, {enabled: !isEnabled, n: nEnabled})
    localStorage.setItem(japanesifyState, JSON.stringify({enabled: !isEnabled, n: nEnabled}))
    setIsEnabled(!isEnabled)
  }

  const checkBoxOnClick = async () => {
    const tabId = await getCurrentTabId()
    browser.tabs.sendMessage(tabId, {enabled: isEnabled, n: !nEnabled})
    localStorage.setItem(japanesifyState, JSON.stringify({enabled: isEnabled, n: !nEnabled}))
    setNEnabled(!nEnabled)
  }

  return (
    <section id="popup">
      <h3>Japanesify!</h3>
      <button
        data-testid="enable-button"
        onClick={enableOnClick}
      >
        {
          isEnabled ? 'disable' : 'enable'
        }
      </button>
      <br/>
      <label id="ん-switch">ん</label>
      <input type="checkbox" id="ん-switch" data-testid="ん-switch" checked={nEnabled} onChange={checkBoxOnClick}/>
    </section>
  );
};

export default Popup;
