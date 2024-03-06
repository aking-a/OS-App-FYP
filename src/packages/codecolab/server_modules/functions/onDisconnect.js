function onDisconnect(sessions,sessionID,ws,username) {

    //if a admin disconnects the session is deleted
    if (sessions[sessionID].session.instance.clients[0] == ws) {

        sessions[sessionID].session.instance.clients.forEach((client) => {
            if(typeof username == 'number' && client !== ws){
                client.send(JSON.stringify({ type: 'disconnected', status: 'true' }))
            //when we do not know the username of the user who disconnected
            }else if (typeof username != 'number') {
                client.send(JSON.stringify({ type: 'disconnected', status: 'true' }))
            }
        });
        delete sessions[sessionID];

    }
    //if a user disconnects the user is removed from the session/ clients list
    else {

        sessions[sessionID].session.instance.clients.forEach((client) => {
            if (client !== ws) {

                client.send(JSON.stringify({ type: 'disconnected', status: 'alert', username: username }))

            }
            //making sure we do not send the disconnected message to the user who disconnected when the username is not know as they have already been lost connection
            if (typeof username != 'number'&& client == ws) {
                client.send(JSON.stringify({ type: 'disconnected', status: 'false' }))
            }
        });
        //remove a socket from the clients list wether the username is known or not
        const index = sessions[sessionID].session.instance.clients.indexOf(ws)
        sessions[sessionID].session.instance.clients.splice(index, 1);

    }
}
module.exports = onDisconnect;