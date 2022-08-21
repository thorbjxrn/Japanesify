import * as React from 'react';
import browser from 'webextension-polyfill';
import { defaultJapanesifyState, JAPANESIFY_STATE } from '../utils/constants';
import { JapanesifyState, kanas } from '../utils/types';
import { getCurrentTabId } from '../utils/utils';
import { Button, Container, Row, Col, InputGroup, FormSelect, FormCheck } from 'react-bootstrap';

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

  const dropdownChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = { ...japanesifyState }
    newState.kana = event.target.value as typeof kanas[number]
    await manageState(newState)
  }

  const toggleBoolean = (key: keyof Omit<JapanesifyState, 'kana'>) => {
    return async (): Promise<void> => {
      const newState = { ...japanesifyState }
      newState[key] = !newState[key]
      await manageState(newState)
    };
  };

  const manageState = async (newState: JapanesifyState) => {
    const tabId = await getCurrentTabId()
    browser.tabs.sendMessage(tabId, newState)
    localStorage.setItem(JAPANESIFY_STATE, JSON.stringify(newState))
    setJapanesifyState(newState)
  }

  const { enabled, a, n, i, u, e, o, han, dak, yoon, kana } = japanesifyState;

  return (
    <section id="popup">
      <div className='jumbotron'>
        <h3 className='text-center'>Japanesify!</h3>
      </div>
      <Container>
        <Row>
          <Col>
            <InputGroup>
              <FormSelect onChange={dropdownChange} value={kana}>
                {
                  kanas.map(val => 
                    <option key={val} value={val}>{val.charAt(0).toUpperCase() + val.slice(1)}</option>
                  )
                }
              </FormSelect>
              <Button
              variant={enabled ? 'success' : 'danger'}
              data-testid="enable-button"
              onClick={toggleBoolean('enabled')}
              >
                {enabled ? 'enabled' : 'disabled'}
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id="ん-switch"
              data-testid="ん-switch"
              checked={n}
              onChange={toggleBoolean('n')}
            >
            </FormCheck>
            <label className="h2 mb-0" id="ん-switch">ん</label>
          </Col>
        </Row>
        <br />
        <Row xs={3}>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id="あ-switch"
              data-testid="あ-switch"
              checked={a}
              onChange={toggleBoolean('a')}
            >
            </FormCheck>
            <label className="h2 mb-0" id="あ-switch">あ</label>
          </Col>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id="い-switch"
              data-testid="い-switch"
              checked={i}
              onChange={toggleBoolean('i')}
            >
            </FormCheck>
            <label className="h2 mb-0" id="い-switch">い</label>
          </Col>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id="う-switch"
              data-testid="う-switch"
              checked={u}
              onChange={toggleBoolean('u')}
            >
            </FormCheck>
            <label className="h2 mb-0" id="う-switch">う</label>
          </Col>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id="え-switch"
              data-testid="え-switch"
              checked={e}
              onChange={toggleBoolean('e')}
            >
            </FormCheck>
            <label className="h2 mb-0" id="え-switch">え</label>
          </Col>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id="お-switch"
              data-testid="お-switch"
              checked={o}
              onChange={toggleBoolean('o')}
            >
            </FormCheck>
            <label className="h2 mb-0" id="お-switch">お</label>
          </Col>
        </Row>
        <br />
        <Row>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id='"-switch'
              data-testid='"-switch'
              checked={dak}
              onChange={toggleBoolean('dak')}
            >
            </FormCheck>
            <label className="h2 mb-0" id='"-switch'>"</label>
          </Col>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id="°-switch"
              data-testid="°-switch"
              checked={han}
              onChange={toggleBoolean('han')}
            >
            </FormCheck>
            <label className="h2 mb-0" id="°-switch">°</label>
          </Col>
        </Row>
        <br />
        <Row>
          <Col className='d-flex align-items-center'>
            <FormCheck 
              type="switch" 
              id="きゃ-switch"
              data-testid="きゃ-switch"
              checked={yoon}
              onChange={toggleBoolean('yoon')}
            >
            </FormCheck>
            <label className="h2 mb-0" id="きゃ-switch">きゃ</label>
          </Col>
        </Row>
      </Container>
      <div className="website">
        <a style={{fontSize: '12px'}} href="https://thorbjxrn.github.io">https://thorbjxrn.github.io
        </a>
      </div>
    </section>
  );
};

export default Popup;
