import * as React from 'react';
import './styles.scss';

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <h2>Japanesify</h2>
      <button
        test-id="enable-button"
      >
        Options Page
      </button>
    </section>
  );
};

export default Popup;
