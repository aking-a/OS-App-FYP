function handleNewRoomClick() {
    // Get the input values
    const input1 = document.getElementById('input1').value;
  
    // Log the input values to the console
    console.log('Input 1 Value:', input1);
  }
  function handleJoinRoomClick() {
    // Get the input values
    const input2 = document.getElementById('input2').value;
  
    // Log the input values to the console
    if(input2){
        console.log('Input 2 Value:', input2);
    }

  }
  
  export {handleJoinRoomClick,handleNewRoomClick };