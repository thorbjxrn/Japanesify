import * as React from 'react';

const Popup: React.FC = () => {

  const [isEnabled, setIsEnabled] = React.useState(false)
  
  return (
    <section id="popup">
      <h2>Japanesify</h2>
      <button
        test-id="enable-button"
        onClick={() => setIsEnabled(!isEnabled)}
      >
        {
          isEnabled ? 'disable' : 'enable'
        }
      </button>
    </section>
  );
};

export default Popup;
