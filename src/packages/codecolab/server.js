const { cli } = require("@osjs/cli");

const rooms = {};

module.exports = (core, proc) => {
    const { routeAuthenticated } = core.make('osjs/express');

    core.app.ws(proc.resource('/socket'), (ws, req) => {
        ws.on('message', (message) => {
            const data = JSON.parse(message);

            if (data.type === 'joinRoom') {
                if (!rooms[data.room]) {
                    rooms[data.room] = { clients: [] };
                }
                rooms[data.room].clients.push(ws);

                ws.send(JSON.stringify({ type: 'roomJoined', room: data.room }));

                const clientCount = rooms[data.room].clients.length;

                if (clientCount > 1) {
                    // Broadcast message to clients in the room
                    rooms[data.room].clients.forEach((client) => {
                        if (client !== ws) {
                            client.send(JSON.stringify({ type: 'userJoined', user: data.user }));
                        }
                    });
                }
            }
            if (data.type === 'codeChange') {
                // Handle code changes
                const room = data.room;
                const newCode = data.code;

                // Broadcast the code change to all participants in the room
                rooms[room].clients.forEach((client) => {
                    if (client !== ws) {
                        client.send(JSON.stringify({ type: 'codeChange', code: newCode }));
                    }
                });
            }
        });

        ws.on('close', () => {
            // Handle the WebSocket closure, such as removing the client from all rooms
            for (const room in rooms) {
                const index = rooms[room].clients.indexOf(ws);
                if (index !== -1) {
                    rooms[room].clients.splice(index, 1);
                }
            }
        });
    });

    return {
        // When the server initializes
        async init() {
            // Perform any initialization tasks here
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