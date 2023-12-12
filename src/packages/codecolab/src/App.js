import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './home.js';
import { Room } from './room.js';
import Popup from './popup.js';
import MonacoEditor from 'react-monaco-editor';

function App({ socket }) {
  const [code, setCode] = useState(`// Welcome to the Collaborative Code Editor\n\nfunction helloWorld() {\n  console.log('Hello, world!');\n}`);
  const [curRoom, setCurRoom] = useState('');
  const [user, setCurName] = useState(generateRandomUserID('User'));
  const [popupMessage, setPopupMessage] = useState(''); // State for the popup message
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup



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


  function handleJoinRoomClick() {
    // Get the input values
    const room = document.getElementById('input2').value;

    if (room) {
      //save the current room the client is in for later
      setCurRoom(room)

      //send this to the room
      if (socket.connected == true) {
        socket.send(JSON.stringify({ type: 'joinRoom', room, user }));
      }
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
    }
    navigate('/')
  }


  return (
    <>
      {showPopup && <Popup message={popupMessage} />}
      <Routes>
        <Route>
          <Route path="/" element={<Home handleJoinRoomClick={handleJoinRoomClick} />} />
          <Route path='/Room' element={<Room handleCodeChange={handleCodeChange} onDisconnect={onDisconnect} code={code} userName={user} roomName={curRoom} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App