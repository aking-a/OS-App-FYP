export default function StartFileShare(incoming){
    const socket = incoming.socket
    if(socket.connected){
        socket.send(JSON.stringify({ type: 'startsession', sessionIden:incoming}));
    }
}