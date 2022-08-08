import * as React from 'react';
import browser from 'webextension-polyfill';
import { defaultJapanesifyState, JAPANESIFY_STATE } from '../utils/constants';
import { JapanesifyState } from '../utils/types';
import { getCurrentTabId } from '../utils/utils';
import { Button } from 'react-bootstrap';

const Popup: React.FC = () => {
  const [japanesifyState, setJapanesifyState] = React.useState(
    defaultJapanesifyState
  );

  React.useEffect(() => {
    const state = JSON.parse(
      window.localStorage.getItem(JAPANESIFY_STATE) ||
        JSON.stringify(defaultJapanesifyState)
    ) as JapanesifyState;
    setJapanesifyState(state);
  }, []);

  const handleAction = (key: keyof JapanesifyState) => {
    return async (): Promise<void> => {
      const newState = { ...japanesifyState };
      newState[key] = !newState[key];
      const tabId = await getCurrentTabId();
      browser.tabs.sendMessage(tabId, newState);
      localStorage.setItem(JAPANESIFY_STATE, JSON.stringify(newState));
      setJapanesifyState(newState);
    };
  };

  const { enabled, a, n, i, u, e, o, han, dak, yoon } = japanesifyState;

  return (
    <section id="popup">
      <h3>Japanesify!</h3>
      <Button
        variant="success"
        data-testid="enable-button"
        onClick={handleAction('enabled')}
      >
        {enabled ? 'disable' : 'enable'}
      </Button>
      <br />
      <label id="ん-switch">ん</label>
      <input
        type="checkbox"
        id="ん-switch"
        data-testid="ん-switch"
        checked={n}
        onChange={handleAction('n')}
      />
      <br />
      <label id="あ-switch">あ</label>
      <input
        type="checkbox"
        id="あ-switch"
        data-testid="あ-switch"
        checked={a}
        onChange={handleAction('a')}
      />
      <label id="い-switch">い</label>
      <input
        type="checkbox"
        id="い-switch"
        data-testid="い-switch"
        checked={i}
        onChange={handleAction('i')}
      />
      <label id="う-switch">う</label>
      <input
        type="checkbox"
        id="う-switch"
        data-testid="う-switch"
        checked={u}
        onChange={handleAction('u')}
      />
      <label id="え-switch">え</label>
      <input
        type="checkbox"
        id="え-switch"
        data-testid="え-switch"
        checked={e}
        onChange={handleAction('e')}
      />
      <label id="お-switch">お</label>
      <input
        type="checkbox"
        id="お-switch"
        data-testid="お-switch"
        checked={o}
        onChange={handleAction('o')}
      />
      <label id='"-switch'>"</label>
      <input
        type="checkbox"
        id='"-switch'
        data-testid='"-switch'
        checked={dak}
        onChange={handleAction('dak')}
      />
      <label id="°-switch">°</label>
      <input
        type="checkbox"
        id="°-switch"
        data-testid="°-switch"
        checked={han}
        onChange={handleAction('han')}
      />
      <label id="きゃ-switch">きゃ</label>
      <input
        type="checkbox"
        id="きゃ-switch"
        data-testid="きゃ-switch"
        checked={yoon}
        onChange={handleAction('yoon')}
      />
    </section>
  );
};

export default Popup;
