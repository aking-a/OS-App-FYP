import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './Styles/App.css';
import { Home } from './home.js';
import { Room } from './room.js';
import Popup from './popup.js';
import { FileData } from './components/file.js'

function App({ osjs, proc, core, socket, _, vfs, basic, win }) {
  const editorRef = useRef(null);
  const [code, setCode] = useState('');
  const [curRoom, setCurRoom] = useState('');
  const [user, setCurName] = useState(generateRandomUserID('User'));
  const [popupMessage, setPopupMessage] = useState(''); // State for the popup message
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup
  const [file, setFile] = useState();//set current file
  const [showFileContainer, setShowFileContainer] = useState(true);//show file container if you are in a room you created otherwise hide it
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('javascript');//set Current language

  function generateRandomUserID(prefix) {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${prefix}${randomNumber}`;
  }
  // //intialising navaigate
  const navigate = useNavigate()

  useEffect(() => {
    // Add the message event listener only once
    socket.on('message', (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'roomJoined') {
        console.log(data.room)
        setCurRoom(data.room)
        setLanguage(data.language)
        navigate('/Room');
      }

      if (data.type === 'userJoined') {
        setPopupMessage(`${data.user} joined the room`); // Set the popup message for a user join
        setShowPopup(true); // Show the popup
        // Add a timeout to hide the popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }
      if (data.type === 'newUserJoined') {
        setLanguage(data.language)
        setCode(data.code)
        setShowFileContainer(false);
      }

      if (data.type === 'codeChange') {
        setCode(data.code);

      }

      if (data.type === 'userLeft') {
        setPopupMessage(`${data.user} left the room`); // Set the popup message for a user leave
        setShowPopup(true); // Show the popup


        // set timeout to prevent message not dissapearing
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('message');
    };
  }, [socket, navigate]);


  async function handleJoinRoomClick() {
    const room = document.getElementById('input2').value;
    //send this to the room
    if (socket.connected == true) {
      socket.send(JSON.stringify({ type: 'joinRoom', room }));
    }


  }
  function handleFileChange() {
      async function userOpenFile(options) {

        return await new Promise((resolve, reject) => {

          //opens vfs
          osjs.make('osjs/dialog', 'file', options, {
            parent: win,
            attributes:{
              modal:true
            }
          },(btn,v)=>{
              if(btn=='ok'&& v){
                console.log('works')
                setFile(v)
                resolve(osjs.make('osjs/vfs').readfile(v, 'bin'));
              }
              else if((btn=='cancle'||btn=='destroy')){
                reject("File not selected");
              }
              else{
                reject("File not selected");
              }
            }
          );
        });

      }

      userOpenFile().then((data) => {
        const textDecoder = new TextDecoder('utf-8');
        const text = textDecoder.decode(data);
        setText(text)
        

      }).catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {

    if (text != '') {
      handleShareFile(text)
    }

  }, [text]);

  function handleShareFile() {
    if (socket.connected == true) {
      setCode(text);
      FileData.file.push(file)
      FileData.content = text
      //sending updates to the code from client to server
      socket.send(JSON.stringify({ type: 'joinRoom', user: user, file: FileData }));

    }
  }

  const handleCodeChange = (newCode, event) => {
    setCode(newCode);

    //making sure the socket is connected to prevent errors
    if (socket.connected == true) {

      //sending updates to the code from client to server
      socket.send(JSON.stringify({ type: 'codeChange', code: newCode, room: curRoom }));
    }
  };
  //removes client from a room on server side will also delete a room if there is no clients in it
  function onDisconnect() {
    if (socket.connected == true) {
      socket.send(JSON.stringify({ type: 'close', room: curRoom, socket: socket, user: user }));
      setCode(null);
      setCurRoom('');
      setShowFileContainer(true);
      setText('')
      setFile()
    }
    navigate('/')
  }
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    editor.focus();

  };


  return (
    <>
      {showPopup && <Popup message={popupMessage} />}
      <Routes>
        <Route>
          <Route path="/" element={<Home handleJoinRoomClick={handleJoinRoomClick} handleFileChange={handleFileChange} showFileContainer={showFileContainer} />} />
          <Route path='/Room' element={<Room handleCodeChange={handleCodeChange} onDisconnect={onDisconnect} code={code} userName={user} roomName={curRoom} handleEditorDidMount={handleEditorDidMount} language={language} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App