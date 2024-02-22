import React from 'react';
import styles from '../../assets/popup.module.css';
function Popup({ message }) {

  const handleDisconnect = () => {
    // Disconnect logic goes here
    setConnected(false);
  };

  return (
    <div className={styles['popup-message']}>
      <h2>{message}</h2>
    </div>
  );
};

export default Popup;