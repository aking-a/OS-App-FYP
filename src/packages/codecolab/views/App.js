import React from 'react';
import './App.css'


export default class App extends React.Component {
  render() {
    return (

      <div>
        <button id="create-room">Create New Room</button>
        <div>
          <input type="text" id="room-id" placeholder="Enter Room ID"></input>
          <button id="join-room">Join Room</button>
        </div>
        <div>
          <textarea id="code" rows="10" cols="50" placeholder="Start coding..."></textarea>
        </div>
      </div>
    );
  }
}