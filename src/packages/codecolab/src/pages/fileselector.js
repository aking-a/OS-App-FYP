import React from 'react';
import clickevent from '../utils/events/clickevent.js';
import styles from '../assets/button.module.css';

export function FileSelector() {

  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>Click the share button to start sharing your file:</p>
      <button onClick={clickevent} className={styles.button}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </button>
    </div>
  );
}