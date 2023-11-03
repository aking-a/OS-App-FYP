import { handleJoinRoomClick, handleNewRoomClick } from './interactions';
import './App.css';
import React, { useEffect } from 'react';

function App({ proc }) {

  //imporitng proc to setup a connection based on the documentation
  useEffect(() => {

    //Creating websocket connection 
    const socket = proc.socket('/socket');

    socket.on('message', (message) => {
      console.log('Received message:', message.data);

    });

    return () => {
      socket.close();
    };
  }, [proc]);

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" id="input1" placeholder="Enter Room Id" />
        <button id="button1" onClick={handleNewRoomClick}>New Room</button>
      </div>
      <div className="input-container">
        <input type="text" id="input2" placeholder="Enter Room Id" />
        <button id="button2" onClick={handleJoinRoomClick}>Join Room</button>
      </div>
    </div>
  );
}

export default App;