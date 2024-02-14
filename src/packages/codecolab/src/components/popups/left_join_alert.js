import React from 'react';

const Popup = ({ message }) => {
  return (
    <div className={styles.popup}> {/* Use the CSS Module class */}
      {message}
    </div>
  );
};

export default Popup;