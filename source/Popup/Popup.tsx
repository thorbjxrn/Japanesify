import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
import { JapanesifyState } from '../utils/types';
import { defaultJapanesifyState, getCurrentTabId, JAPANESIFY_STATE } from '../utils/utils';

const Popup: React.FC = () => {

  const [japanesifyState, setJapanesifyState] = React.useState(defaultJapanesifyState)

  React.useEffect(() => {
    const state = JSON.parse(window.localStorage.getItem(JAPANESIFY_STATE)!) as JapanesifyState || defaultJapanesifyState
    setJapanesifyState(state)
  }, [])

  const handleAction = (key: keyof JapanesifyState) => {
    return async () => {
      const newState = {...japanesifyState}
      newState[key] = !newState[key]
      const tabId = await getCurrentTabId()
      browser.tabs.sendMessage(tabId, newState)
      localStorage.setItem(JAPANESIFY_STATE, JSON.stringify(newState))
      setJapanesifyState(newState)
    }
  }

  return (
    <section id="popup">
      <h3>Japanesify!</h3>
      <button
        data-testid="enable-button"
        onClick={handleAction('enabled')}
      >
        {
          japanesifyState.enabled ? 'disable' : 'enable'
        }
      </button>
      <br/>
      <label id="ん-switch">ん</label>
      <input type="checkbox" id="ん-switch" data-testid="ん-switch" checked={japanesifyState.n} onChange={handleAction('n')}/>
      <br/>
      <label id="あ-switch">あ</label>
      <input type="checkbox" id="あ-switch" data-testid="あ-switch" checked={japanesifyState.a} onChange={handleAction('a')}/>
    </section>
  );
};

export default Popup;
