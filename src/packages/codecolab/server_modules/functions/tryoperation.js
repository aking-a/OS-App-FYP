async function tryoperation(linelock, ws, session, actions) {
    await linelock.acquire(actions.Start_Line)
    try {
        // Edit the line
        await broadcastEdit(ws, session, actions)
    } finally {
        // Release the lock for the line
        linelock.release(actions.Start_Line);
        await releaseLineBroadcast(ws, session, actions)
    }

    //Action: action, Start_Line: startLine, End_Line: endLine, Start_Column: startColumn, End_Column: endColumn, Text: text


}

async function broadcastEdit(ws, session, actions) {
    session.instance.clients.forEach((client) => {
        if (client !== ws) {

            client.send(JSON.stringify({ type: 'incodechange', actions: actions }));

        }

    });
}
async function releaseLineBroadcast(ws, session, actions) {
    session.instance.clients.forEach((client) => {
        if (client !== ws) {

            client.send(JSON.stringify({ type: 'releaseline', line: actions.Start_Line }));

        }

    });
}

// Export your function
module.exports = tryoperation;