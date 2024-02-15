function StartFileShare(incoming) {
    const socket = incoming.socket
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'startsession', sessionIden: incoming }));
    }
}
function CodeChange(code, socket, sessionID) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'codechange', code: code, sessionID: sessionID }));
    }
}
function JoinSession(socket, sessionID) {
    if (socket.connected) {
        socket.send(JSON.stringify({ type: 'joinsession', sessionID: sessionID }));
    }
}
export { StartFileShare, CodeChange, JoinSession }