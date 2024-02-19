import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import DidMount from '../utils/monaco/handledidmount.js'
import { getSession, setSession } from "../utils/getsession"
import { clientChange } from '../utils/monaco/handleChanges.js';
import DisconnectButton from '../components/buttons/disconnect.js'
import DropdownMenu from '../components/dropdown/dropdown.js'; // import your DropdownMenu component
import { getApp } from '../hooks/useSetApp.js';
import Popup from '../components/popups/left_join_alert.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons';
import { userOpenFile } from '../utils/openfile.js';

export function FileSession() {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('javascript')
  const [userChange, setUserChange] = useState(true);
  const [code, setCode] = useState('')
  const [user, setUser] = useState('')
  const [sid, setSid] = useState('')
  const [link, setLink] = useState('')
  const [popupMessage, setPopupMessage] = useState(''); // State for the popup message
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup
  const [isVisible, setIsVisible] = useState(false);

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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

    if (session.isVisible) {
      setIsVisible(true)
      setLink(session.sharelink)
    }

  }, [DidMount])


  getApp().win.on('resized', (dimension) => {
    editorRef.current.layout({ width: dimension.width, height: dimension.height });
  })

  const handleSelect = (option) => {
    if (option.label === 'open') {
      userOpenFile().then((promise) => {
        const file = promise.file
        const data = promise.result
        const textDecoder = new TextDecoder('utf-8');
        const text = textDecoder.decode(data);
        const session = getSession()
        session.file = file
        session.code = text
        setCode(text)
        clientChange()
      }).catch((error) => {
        console.log(error)
      });
      
    }
  };
  useEffect(() => {
    if (showPopup) {

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
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', backgroundColor: '#1E1E1E', border: '3px solid #808080' }}>
        {isVisible &&(<DropdownMenu
          options={options}
          handleSelect={handleSelect}
        />)}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ margin: '0 10px', color: '#fff' }}>username: {user}</p>
          <p style={{ margin: '0 10px', color: '#fff' }}>sessionid: {sid}</p>
          {isVisible && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: '0 10px', color: '#fff' }}>sharelink: {link}</p>
              <button onClick={copyToClipboard} style={{ background: 'none', border: 'none' }}>
                <FontAwesomeIcon icon={isCopied ? faCheck : faClipboard} color={isCopied ? 'green' : 'white'} />
              </button>
            </div>
          )}
        </div>
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