import React from 'react';
import styles from './Styles/home.module.css';

export function Home({handleJoinRoomClick,handleFileChange,showFileContainer}) {

  return (
    
    <div className="container">
        {showFileContainer && (
        <div className={styles['file-container']}>
          <button className={styles['file-button']}onClick={handleFileChange} >choose file</button>
        </div>
      )}
      <div className="input-container">
        <input type="text" id="input2" placeholder="Enter Room Id" />
        <button id="button2" onClick={handleJoinRoomClick}>Join Room</button>
      </div>
    </div>
  );
}