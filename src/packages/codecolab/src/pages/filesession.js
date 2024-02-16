import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import DidMount from '../utils/monaco/handledidmount.js'
import { getSession, setSession } from "../utils/getsession"
import { clientChange } from '../utils/monaco/handleChanges.js';
import DisconnectButton from '../components/buttons/disconnect.js'
import DropdownMenu from '../components/dropdown/dropdown.js'; // import your DropdownMenu component
import { Box } from '@chakra-ui/react';
import { getApp } from '../hooks/useSetApp.js';
import Popup from '../components/popups/left_join_alert.js';

export function FileSession() {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('javascript')
  const [userChange, setUserChange] = useState(true);
  const [code, setCode] = useState('')
  const [user, setUser] = useState('')
  const [sid, setSid] = useState('')
  const [popupMessage, setPopupMessage] = useState(''); // State for the popup message
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

  useEffect(() => {
    const session = getSession()
    session.setState(setCode)
    const editor = session.getData().editorRef

    setSid(session.sessionID)
    setUser(session.username)

    editorRef.current = editor
    setCode(session.code)
    setLanguage(session.language)

    session.setPopupMessage(setPopupMessage)
    session.setShowPopup(setShowPopup)

  }, [DidMount])


  getApp().win.on('resized',(dimension) => {
    editorRef.current.layout({ width: dimension.width, height: dimension.height });
  })

  const handleSelect = (option) => {

  };
  useEffect(() => {
    if(showPopup){
      
      setTimeout(() => {
        setShowPopup(false)
      }, 3000)
    }
  }, [showPopup]);

  const params = {
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

  const options = [
    { id: 1, label: 'save' },
    { id: 2, label: 'open' },
    { id: 3, label: 'user list' },
  ];

  return (
    <div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', backgroundColor: '#1E1E1E',  border: '3px solid #808080'}}>
        <DropdownMenu
          options={options}
          handleSelect={handleSelect}
        />
        <p style={{ margin: '0 10px', color: '#fff' }}>username: {user}</p>
        <p style={{ margin: '0 10px', color: '#fff' }}>sessionid: {sid}</p>
        <DisconnectButton />
      </div>
      <div style={{ position: 'relative', zIndex: 0 }}>
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
      {showPopup && <Popup message={popupMessage} />}
    </div>
  );
}