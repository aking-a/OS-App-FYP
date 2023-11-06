import React from 'react';
import styles from './popup.module.css'; 
const Popup = ({ message }) => {
  return (
    <div className={styles.popup}> {/* Use the CSS Module class */}
      {message}
    </div>
  );
};

export default Popup;