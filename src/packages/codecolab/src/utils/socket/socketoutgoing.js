function StartFileShare(socket,newfile, username) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'startsession', file: newfile, username: username }));
    }
}
function CodeChange(code, socket, sessionID) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'codechange', code: code, sessionID: sessionID }));
    }
}
function JoinSession(socket, sessionID, username) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'joinsession', sessionID: sessionID, username: username }));
    }
}
function handleDisconnect(socket, sessionID, username) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'disconnect', sessionID: sessionID, username: username }));
    }
}
export { handleDisconnect, StartFileShare, CodeChange, JoinSession }