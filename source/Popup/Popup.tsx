import * as React from 'react';

const Popup: React.FC = () => {

  const [isEnabled, setIsEnabled] = React.useState(false)

  return (
    <section id="popup">
      <h3>Japanesify!</h3>
      <button
        test-id="enable-button"
        onClick={() => setIsEnabled(!isEnabled)}
      >
        {
          isEnabled ? 'disable' : 'enable'
        }
      </button>
      <br/>
      <label id="ん-switch">ん</label>
      <input type="checkbox" id="ん-switch" test-id="ん-switch"/>
    </section>
  );
};

export default Popup;
