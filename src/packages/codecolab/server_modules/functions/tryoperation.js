async function tryoperation(linelock, ws, session,line) {
    //if another ws comes in here tring to acuire the lock it will be blocked(added to a queu) until the lock is released
   const verdict = await linelock.acquire(actions.Start_Line)
   if(verdict){
    await broadcastEdit(ws,session,line) 
   }else{
    return
   }


}
//apply the change to all other connected clients
async function broadcastEdit(ws, session, line) {
    session.instance.clients.forEach((client) => {
        if (client !== ws) {

            client.send(JSON.stringify({ type: 'hasline', line: line}));

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