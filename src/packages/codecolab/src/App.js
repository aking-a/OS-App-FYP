import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div id='container'>
        <div>
          <div>
            <button id="create-room">Create New Room</button>
            <input type="text" id="room-id-new" placeholder="Enter Room ID"></input>
          </div>
          <div>
            <button id="join-room">Join Room</button>
            <input type="text" id="room-id" placeholder="Enter Room ID"></input>
          </div>
        </div>
      </div>
    );
  }
}
export default App;