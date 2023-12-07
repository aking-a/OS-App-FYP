import React from 'react';
import styles from './Room.module.css'; // Import the CSS module
import MonacoEditor from 'react-monaco-editor';


export function Room({ handleCodeChange, code, userName, roomName, onDisconnect, userList }) {
  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };

  const onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
    // Call your handleCodeChange function here
    handleCodeChange(newValue);
  };

  const options = {
    selectOnLineNumbers: true,
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['user-info']}>
          <span className={styles['user-name']}>User: {userName}</span>
          <span className={styles['room-name']}>Room: {roomName}</span>
        </div>
        <button
          className={styles['disconnect-button']}
          onClick={onDisconnect}
        >
          Disconnect
        </button>
      </div>
      <div className={styles['editor-container']}>
        <MonacoEditor
          width="800"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </div>
    </div>
  );
}