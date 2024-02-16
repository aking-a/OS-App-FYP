import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import DidMount from '../utils/monaco/handledidmount.js'
import { getSession, setSession } from "../utils/getsession"
import { clientChange} from '../utils/monaco/handleChanges.js';
import  DisconnectButton from '../components/buttons/disconnect.js'

export function FileSession() {
  const editorRef = useRef(null)
  const [language, setLanguage] = useState('javascript')
  const [userChange, setUserChange] = useState(true);
  const [code, setCode] = useState('')

  useEffect(() => {
    const session = getSession()
    session.setState(setCode)
    const editor = session.getData().editorRef
    setCode(session.code)
    setLanguage(session.language)

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
      <div>
        <DisconnectButton></DisconnectButton>
      </div>
      <MonacoEditor
        width="800"
        height="600"
        language={language}
        theme="vs-dark"
        options={options}
        editorDidMount={DidMount}
        value={code}
        onChange={clientChange}
      />
    </div>
  );
}