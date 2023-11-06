import React from 'react';
import styles from './Room.module.css'; // Import the CSS module

export function Room({ handleCodeChange, code, userName, roomName, onDisconnect, userList }) {
  return (
    <div className={styles.container}> {/* Use styles.container for the container */}
      <div className={styles.header}> {/* Use styles.header for the header */}
        <div className={styles['user-info']}> {/* Use styles['user-info'] for user-info */}
          <span className={styles['user-name']}>User: {userName}</span> {/* Use styles['user-name'] for user-name */}
          <span className={styles['room-name']}>Room: {roomName}</span> {/* Use styles['room-name'] for room-name */}
        </div>
        <button className={styles['disconnect-button']} onClick={onDisconnect}>Disconnect</button> {/* Use styles['disconnect-button'] for the disconnect button */}
      </div>
      <div className={styles['editor-container']}> {/* Use styles['editor-container'] for the editor-container */}
        <textarea
          id="code-editor"
          className={styles.editor}
          value={code}
          onChange={handleCodeChange}
        ></textarea>
      </div>
    </div>
  );
}