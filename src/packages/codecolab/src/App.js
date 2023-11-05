import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './home.js';
import { Room } from './room.js';

function App({ socket }) {
  const [code, setCode] = useState(`// Welcome to the Collaborative Code Editor\n\nfunction helloWorld() {\n  console.log('Hello, world!');\n}`);
  const [curRoom, setCurRoom] = useState(''); // Initialize with an empty string



  function generateRandomUserID(prefix) {
    const randomNumber = Math.floor(Math.random() * 1000); // Adjust the range as needed
    return `${prefix}${randomNumber}`;
  }

  //Generating random uid
  const user = generateRandomUserID('User');

  //intialising navaigate
  const navigate = useNavigate()

  //On client recieving message from server do something
  socket.on('message', (event) => {
    const data = JSON.parse(event.data);

    //depending on the data type do something with the message
    //Solution to using basic webSockets instead of socket.io was to package messages as JSON with data types

    if (data.type === 'roomJoined') {

      //when a room is joined by a user the navigate to /Room will load a new page with the code editor
      console.log(`You've joined room: ${data.room}`);
      navigate('/Room')
    }

    //When a broadcast for user joined a room is sent this is where it is handled
    if (data.type === 'userJoined') {
      console.log(`${data.user} has joined the room`);
    }

    //On code change update the code from server
    if (data.type === 'codeChange') {
      setCode(data.code)
    }
  });


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



  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home handleJoinRoomClick={handleJoinRoomClick} />} />
        <Route path='/Room' element={<Room handleCodeChange={handleCodeChange} code={code} />} />
      </Route>
    </Routes>
  );
}

export default App