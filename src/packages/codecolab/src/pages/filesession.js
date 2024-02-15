import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import DidMount from '../utils/monaco/handledidmount.js'
import { getSession, setSession } from "../utils/getsession"
import { CodeChange } from '../utils/socket/socketoutgoing.js'
import { getApp } from '../hooks/useSetApp.js';

export function FileSession() {
  const [language, setLanguage] = useState('javascript')

  useEffect(() => {
    const session = getSession()
    const editor = session.getData().editorRef
    editor.setValue(session.code)

    setLanguage(session.language)
    editor.onDidChangeModelContent(() => {
      CodeChange(editor.getValue(), session.socket, session.sessionID)
    });
  }, [DidMount])


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
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };
  return (
    <div >
      <MonacoEditor
        width="800"
        height="600"
        language={language}
        theme="vs-dark"
        value=''
        options={options}
        editorDidMount={DidMount}
      />
    </div>
  );
}