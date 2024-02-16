import React from 'react';

function Popup({ message }) {

  const handleDisconnect = () => {
    // Disconnect logic goes here
    setConnected(false);
  };

  return (
    <div className={styles.popup}>
      {message}
    </div>
  );
};

export default Popup;