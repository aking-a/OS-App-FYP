import React, {useState} from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

export function Room({ handleCodeChange, code, userName, roomName, onDisconnect, handleEditorDidMount,language}) {
  const options = {
    selectOnLineNumbers: true,
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
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
      <div >
        <MonacoEditor
          width="800"
          height="600"
          language={language}
          theme="vs-dark"
          value={code}
          options={options}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
        />
       </div>
     </div>
  );
}