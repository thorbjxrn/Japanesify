import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';

const Popup: React.FC = () => {

  const [isEnabled, setIsEnabled] = React.useState(false)

  const enableOnClick = () => {
    browser.tabs.sendMessage(1, {})
    setIsEnabled(!isEnabled)
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
      <input type="checkbox" id="ん-switch" data-testid="ん-switch"/>
    </section>
  );
};

export default Popup;
