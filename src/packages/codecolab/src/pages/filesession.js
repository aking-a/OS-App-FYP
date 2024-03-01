import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import DidMount from '../utils/monaco/handledidmount.js'
import { clientChange } from '../utils/monaco/handleChanges.js';
import DisconnectButton from '../components/buttons/disconnect.js'
import DropdownMenu from '../components/dropdown/dropdown.js'; // import your DropdownMenu component
import { getApp } from '../hooks/useSetApp.js';
import Popup from '../components/popups/left_join_alert.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons';
import useDidMountListener from '../hooks/useDidMountListener.js';
import { options } from '../data/editoroptions.js';
import useShowPopupListener from '../hooks/useShowPopupListener.js';
import { getSession } from "../utils/getsession"

export function FileSession() {
  const [language, setLanguage] = useState('')
  const [code, setCode] = useState('')
  const [user, setUser] = useState('')
  const [sid, setSid] = useState('')
  const [link, setLink] = useState('')
  const [popupMessage, setPopupMessage] = useState(''); // State for the popup message
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup
  const [isVisible, setIsVisible] = useState(false);

  const [isCopied, setIsCopied] = useState(false);

  useDidMountListener(DidMount, setSid, setUser, setCode, setLanguage, setPopupMessage, setShowPopup, setIsVisible, setLink)

  useShowPopupListener(showPopup, setShowPopup)


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  getApp().win.on('resized', (dimension) => {
    getSession().editorRef.layout({ width: dimension.width, height: dimension.height });
  })



  return (
    <div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', backgroundColor: '#1E1E1E', border: '3px solid #808080' }}>
        {isVisible && (<DropdownMenu

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