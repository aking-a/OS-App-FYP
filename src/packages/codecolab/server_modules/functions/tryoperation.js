// This function attempts to acquire a lock for a line.
// If the lock is successfully acquired, it broadcasts the line to all other connected clients.
// If the lock is not acquired, it simply returns.
async function tryoperation(linelock, ws, session, line, lockedlines, timestamp) {
    // Attempt to acquire the lock for the line.
    // If another WebSocket tries to acquire the lock at the same time, it will be blocked (added to a queue) until the lock is released.
    const verdict = await linelock.acquire(line, timestamp);
    
    // If the lock was successfully acquired
    if(verdict){
        // Add the line to the set of locked lines
        lockedlines.add(line);
        
        // Broadcast the line to all other connected clients
        await broadcastEdit(ws, session, line);
    } else {
        // If the lock was not acquired, return
        return;
    }
}

// This function broadcasts a line to all other connected clients.
async function broadcastEdit(ws, session, line) {
    // Iterate over all connected clients
    session.instance.clients.forEach((client) => {
        // If the client is not the WebSocket that acquired the lock
        if (client !== ws) {
            // Send a message to the client indicating that the line is locked
            client.send(JSON.stringify({ type: 'hasline', line: line }));
        }
    });
}

// Export the tryoperation function
module.exports = tryoperation;