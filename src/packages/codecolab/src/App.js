import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './home.js';
import { Room } from './room.js';

function App({ socket }) {
  const [code, setCode] = useState(`// Welcome to the Collaborative Code Editor\n\nfunction helloWorld() {\n  console.log('Hello, world!');\n}`);
  const [curRoom, setCurRoom] = useState('');
  const [user, setCurName] = useState(generateRandomUserID('User'));
  const [userList, setUserList] = useState([]); // Maintain the list of users



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
        navigate('/Room');
      }

      if (data.type === 'userJoined') {
        setUserList((prevUserList) => [...prevUserList, data.user]);
      }

      if (data.type === 'codeChange') {
        setCode(data.code);
      }
      if (data.type === 'userLeft') {
        setUserList((prevUserList) => prevUserList.filter((user) => user !== data.user));
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
      socket.send(JSON.stringify({ type: 'joinRoom', room, user }));
    }

  }

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
    // Send the new code to the server via WebSocket
    if (socket) {
      socket.send(JSON.stringify({ type: 'codeChange', code: newCode, room: curRoom }));
    }
  };
  function onDisconnect() {
    socket.send(JSON.stringify({ type: 'close', room: curRoom, socket:socket , user:user}));
    navigate('/')
  }


  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home handleJoinRoomClick={handleJoinRoomClick} />} />
        <Route path='/Room' element={<Room handleCodeChange={handleCodeChange} onDisconnect={onDisconnect} code={code} userName={user} roomName={curRoom} userList={userList} />} />
      </Route>
    </Routes>
  );
}

export default App