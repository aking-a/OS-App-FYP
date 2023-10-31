import React, { Component } from 'react';
import { handleJoinRoomClick,handleNewRoomClick } from './interactions';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="input-container">
          <input type="text" id="input1" placeholder="Enter Room Id" />
          <button id="button1"  onClick={handleNewRoomClick}>New Room</button>
        </div>
        <div className="input-container">
          <input type="text" id="input2" placeholder="Enter Room Id" />
          <button id="button2"  onClick={handleJoinRoomClick}>Join Room</button>
        </div>
      </div>
    );
  }
}
export default App;