import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';// Monaco editor for the code editor
import DidMount from '../utils/monaco/handledidmount.js'//makes sure monaco is mounted correctly
import DisconnectButton from '../components/buttons/disconnect.js'//the  dicsonnect button
import DropdownMenu from '../components/dropdown/dropdown.js'; // dropdown menu
import { getApp } from '../hooks/useSetApp.js';//app variables
import Popup from '../components/popups/left_join_alert.js';//The popup component which diasplays the alert join message or dicsonnect message
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';//used to make the the clipboard and tick icon
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';//^
import useDidMountListener from '../hooks/useDidMountListener.js';// sets up session varibales like diapling the username and session id and in the admins case the share link etc
import { options } from '../data/editoroptions.js';// Monaco editor options
import useShowPopupListener from '../hooks/useShowPopupListener.js';// listens for the show popup event and displays it for a few seconds
import { getSession } from "../utils/getsession"//session variables
import useActionListener from '../hooks/useActionListener.js';// listens for the action event and then sends it to the server
import readOnlyLines from '../utils/monaco/handleReadOnlyLines'// makes the lines read only

export function FileSession() {
  const [language, setLanguage] = useState('')//monaco uses this to set the language of the editor
  const [code, setCode] = useState('')// sets the code in the editor
  const [user, setUser] = useState('')// sets the user name
  const [sid, setSid] = useState('')// sets the session id
  const [link, setLink] = useState('')// sets the share link
  const [popupMessage, setPopupMessage] = useState(''); // State for the popup message
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup
  const [isVisible, setIsVisible] = useState(false);// Control for dropdown menu visibility

  const [isCopied, setIsCopied] = useState(false);// Changes the clipboard icon to a tick when the link is copied

  useDidMountListener(DidMount, setSid, setUser, setCode, setLanguage, setPopupMessage, setShowPopup, setIsVisible, setLink)//sets up all the session variables whem editor mounts

  useShowPopupListener(showPopup, setShowPopup)//controls how long the popup is displayed for by using setTimeout once its done it will reset the showPopup state

  useActionListener(DidMount)//uses the editorRef to listen for the action event and then sends it to the server

  readOnlyLines(DidMount)//makes the lines read only in the editor used to prevent conflicts when multiple users try to edit the same line

  //just copys the link to the users clipboard and changes the icon to a tick
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  //when the MULE/OS.js window is resized the editor will resize to fit the window
  getApp().win.on('resized', (dimension) => {
    getSession().editorRef.layout({ width: dimension.width, height: dimension.height });
  })

  //the isVisible state is used to control the visibility of the dropdown menu
  //the showPopup state is used to control the visibility of the popup
  return (
    <div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', backgroundColor: '#1E1E1E', border: '3px solid #808080' }}>
        {isVisible && (<DropdownMenu />)}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ margin: '0 10px', fontSize: '15px' }}><strong style={{ color: 'red' }}>User Name: </strong> <strong style={{ color: 'white' }}>{user}</strong></p>
          <p style={{ margin: '0 10px', fontSize: '15px' }}><strong style={{ color: 'red' }}>Session ID: </strong> <strong style={{ color: 'white' }}>{sid}</strong></p>
          {isVisible && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: '0 10px', fontSize: '15px' }}><strong style={{ color: 'red' }}>Share Link: </strong> <strong style={{ color: 'white' }}>{link}</strong></p>
              <button onClick={copyToClipboard} style={{ background: 'none', border: 'none' }}>
                
                <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} color={isCopied ? 'green' : 'black'} size="2x" style={{ padding: '10px' }}/>
              </button>
            </div>
          )}
        </div>
        <DisconnectButton />
      </div>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <MonacoEditor
          width="1000"
          height="800"
          language={language}
          theme="vs-dark"
          options={options}
          editorDidMount={DidMount}
          value={code}
        />
      </div>
      {showPopup && <Popup message={popupMessage} />}
    </div>
  );
}