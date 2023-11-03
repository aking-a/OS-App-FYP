function handleNewRoomClick() {
    // Get the input values
    const input1 = document.getElementById('input1').value;

    if(input1){
      return input1;
    }
  }
  function handleJoinRoomClick() {
    // Get the input values
    const input2 = document.getElementById('input2').value;
  
    // Log the input values to the console
    if(input2){
        return input2;
    }

  }
  
  export {handleJoinRoomClick,handleNewRoomClick};