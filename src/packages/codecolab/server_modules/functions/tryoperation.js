async function tryoperation(linelock, ws, session,line,lockedlines) {
    //if another ws comes in here tring to acuire the lock it will be blocked(added to a queu) until the lock is released
   const verdict = await linelock.acquire(line)
   if(verdict){
    lockedlines.add(line)
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

// Export your function
module.exports = tryoperation;