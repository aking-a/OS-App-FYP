function onDisconnect(sessions,sessionID,ws,username) {


    if (sessions[sessionID].session.instance.clients[0] == ws) {

        sessions[sessionID].session.instance.clients.forEach((client) => {
            if(typeof username == 'number' && client !== ws){
                client.send(JSON.stringify({ type: 'disconnected', status: 'true' }))

            }else if (typeof username != 'number') {
                client.send(JSON.stringify({ type: 'disconnected', status: 'true' }))
            }
        });
        delete sessions[sessionID];

    }
    else {

        sessions[sessionID].session.instance.clients.forEach((client) => {
            if (client !== ws) {

                client.send(JSON.stringify({ type: 'disconnected', status: 'alert', username: username }))

            }
            if (typeof username != 'number'&& client == ws) {
                client.send(JSON.stringify({ type: 'disconnected', status: 'false' }))
            }
        });
        const index = sessions[sessionID].session.instance.clients.indexOf(ws)
        sessions[sessionID].session.instance.clients.splice(index, 1);

    }
}
module.exports = onDisconnect;