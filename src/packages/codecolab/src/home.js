import React from 'react';

export function Home({handleJoinRoomClick}) {

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" id="input2" placeholder="Enter Room Id" />
        <button id="button2" onClick={handleJoinRoomClick}>Join Room</button>
      </div>
    </div>
  );
}