import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
import { getCurrentTabId } from '../utils/utils';

const Popup: React.FC = () => {

  const [isEnabled, setIsEnabled] = React.useState(false)
  const [nEnabled, setNEnabled] = React.useState(false)

  const enableOnClick = async () => {
    const tabId = await getCurrentTabId()
    browser.tabs.sendMessage(tabId, {enabled: !isEnabled, n: nEnabled})
    browser.storage.local.set({state: {enabled: !isEnabled, n: nEnabled}})
    setIsEnabled(!isEnabled)
  }

  const checkBoxOnClick = async () => {
    const tabId = await getCurrentTabId()
    browser.tabs.sendMessage(tabId, {enabled: isEnabled, n: !nEnabled})
    browser.storage.local.set({state: {enabled: isEnabled, n: !nEnabled}})
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
