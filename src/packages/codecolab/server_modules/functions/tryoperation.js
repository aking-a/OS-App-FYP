async function tryoperation(linelock, ws, session, actions) {
    //if another ws comes in here tring to acuire the lock it will be blocked(added to a queu) until the lock is released
    await linelock.acquire(actions.Start_Line)
    try {
        // Edit the line
        await broadcastEdit(ws, session, actions)
    } finally {
        // Release the lock for the line
        linelock.release(actions.Start_Line);
        await releaseLineBroadcast(ws, session, actions)
    }


}
//apply the change to all other connected clients
async function broadcastEdit(ws, session, actions) {
    session.instance.clients.forEach((client) => {
        if (client !== ws) {

            client.send(JSON.stringify({ type: 'incodechange', actions: actions }));

        }

    });
}
//tell all other clients that the lock has been released
async function releaseLineBroadcast(ws, session, actions) {
    session.instance.clients.forEach((client) => {
        if (client !== ws) {

            client.send(JSON.stringify({ type: 'releaseline', line: actions.Start_Line }));

        }

    });
}

// Export your function
module.exports = tryoperation;