//This is used to start a file sharing sessions
function StartFileShare(socket, newfile, username) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'startsession', file: newfile, username: username }));
    }
}
//This is used when the client wants to send a code update to the server
function CodeChange(actions, socket, sessionID, code) {

    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'codechange', actions: actions, sessionID: sessionID, code: code }));
    }
}
//When a user joins the session
function JoinSession(socket, sessionID, username) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'joinsession', sessionID: sessionID, username: username }));
    }
}
//When a user disconnects via the dicconnect button
function handleDisconnect(socket, sessionID, username) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'disconnect', sessionID: sessionID, username: username }));
    }
}
function acquireLock(socket, sessionID, curline) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'acquirelock', sessionID: sessionID,line: curline,}));
    }
}
function releaseLock(socket, sessionID, ) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'releaselock', sessionID: sessionID,  }));
    }
}
export { handleDisconnect, StartFileShare, CodeChange, JoinSession, acquireLock, releaseLock }