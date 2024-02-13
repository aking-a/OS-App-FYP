import React from 'react';
import styles from './Styles/home.module.css';

export function Home({handleFileChange,showFileContainer}) {

  return (
    
    <div className="container">
        {showFileContainer && (
        <div className={styles['file-container']}>
          <button className={styles['file-button']}onClick={handleFileChange} >choose file</button>
        </div>
      )}
    </div>
  );
}