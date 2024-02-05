const { cli } = require("@osjs/cli");

//rooms json where room names are fixed to websocket instances 
const rooms = {};

module.exports = (core, proc) => {
    const { routeAuthenticated } = core.make('osjs/express');


    return {
        // When the server initializes
        async init() {
            //os.js setup of server side socket
            core.app.ws(proc.resource('/socket'), (ws, req) => {

                //handle incoming messages
                ws.on('message', (message) => {
                    const data = JSON.parse(message);

                    //handles messages when dtype = joinRoom
                    if (data.type === 'joinRoom') {

                        //if a room name does not already exist in the json create a new room and append clients obj to it
                        if (!rooms[data.room]) {
                            rooms[data.room] = { clients: [] , code: ''};
                        }

                        //push the current connected websocket into that room.client obj
                        rooms[data.room].clients.push(ws);
                        //nav to room
                        ws.send(JSON.stringify({ type: 'roomJoined', room: data.room, }));


                        //getting amount of clients in a room count
                        const clientCount = rooms[data.room].clients.length;

                        if (clientCount > 1) {
                            const room_code = rooms[data.room].code
                            rooms[data.room].clients.forEach((client) => {
                                // stoping duplicate messages being sent
                                if (client !== ws) {
                                    client.send(JSON.stringify({ type: 'userJoined', user: data.user}));
                                }
                                else if(client == ws){
                                    client.send(JSON.stringify({ type: 'newUserJoined', code: room_code}));
                                }
                            });
                        }
                    }
                    //handling code changes recieved from cli
                    if (data.type === 'codeChange') {
                        // Handle code changes
                        const room = data.room;
                        const newCode = data.code;
                        rooms[room].code = newCode;
                        // Broadcast the code change to all clients in the room
                        rooms[room].clients.forEach((client) => {

                            // preventing duplicate instances being sent to cli uploading/changing the code
                            if (client !== ws) {
                                client.send(JSON.stringify({ type: 'codeChange', code: newCode }));
                            }
                        });
                    }
                    if (data.type === 'close') {
                        const room = data.room;

                        const index = rooms[room].clients.indexOf(ws)

                        //Remove the client from the room
                        if (index !== -1) {
                            rooms[room].clients.splice(index, 1);

                            rooms[data.room].clients.forEach((client) => {

                                // stoping duplicate messages being sent
                                if (client !== ws) {
                                    client.send(JSON.stringify({ type: 'userLeft', user: data.user }));
                                }
                            });

                            // If there are no clients left in the room, destroy the room
                            if (rooms[room].clients.length === 0) {
                                delete rooms[room];
                            }

                        }
                        //Close the WebSocket connection
                        ws.close();
                    }
                });
            });
        },

        // When the server starts
        async start() {
            // Perform any tasks when the server starts here
        },

        // When the server goes down
        destroy() {
            // Perform any cleanup tasks here
        },
    };
};