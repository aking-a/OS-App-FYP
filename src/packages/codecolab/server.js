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
                        let inputId = crypto.randomUUID();
                        //if a room name does not already exist in the json create a new room and append clients obj to it
                        if (!rooms[inputId] && data.room == null) {
                            rooms[inputId] = { clients: [], file: [] };
                            rooms[inputId].clients.push(ws);
                            rooms[inputId].file.push(data.file);
                        }
                        else if (data.room != null) {
                            inputId = data.room
                            rooms[inputId].clients.push(ws);
                        }
                        f_name = rooms[inputId].file[0].file[0].filename
                        const extension = f_name.split('.').pop();
                        switch (extension) {
                            case 'py': rooms[inputId].file[0].language = 'python'; break;
                            case 'html': rooms[inputId].file[0].language = 'html'; break;
                            case 'css': rooms[inputId].file[0].language = 'css'; break;
                            case 'java': rooms[inputId].file[0].language = 'java'; break;
                            case 'php': rooms[inputId].file[0].language = 'php'; break;
                            case 'js': rooms[inputId].file[0].language = 'javascript'; break;
                            case 'cs': rooms[inputId].file[0].language = 'cs'; break;
                        }

                        //push the current connected websocket into that room.client obj

                        //nav to room
                        ws.send(JSON.stringify({ type: 'roomJoined', room: inputId,language:rooms[inputId].file[0].language }));


                        //getting amount of clients in a room count
                        const clientCount = rooms[inputId].clients.length;

                        if (clientCount > 1) {
                            const room_code = rooms[inputId].file[0].content
                            const language = rooms[inputId].file[0].language
                            rooms[inputId].clients.forEach((client) => {
                                // stoping duplicate messages being sent
                                if (client !== ws) {
                                    client.send(JSON.stringify({ type: 'userJoined', user: data.user }));
                                }
                                else if (client == ws) {
                                    client.send(JSON.stringify({ type: 'newUserJoined', code: room_code, language: language }));
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