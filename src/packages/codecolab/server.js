const { cli } = require('webpack');
const CreateNewSession = require('./server_modules/newsession.js')
const crypto = require('crypto');
const Lock = require('./server_modules/linelock.js');
const tryoperation = require('./server_modules/functions/tryoperation.js');
const applyEdit = require('./server_modules/functions/serverDocEditor.js');
const onDisconnect = require('./server_modules/functions/onDisconnect.js');
const { on } = require('events');
const sessions = {}

function generateUUID() {
  const bytes = crypto.randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 1
  return bytes.toString('hex').match(/.{1,2}/g).join('-');
}
module.exports = (core, proc) => {
  const { routeAuthenticated } = core.make('osjs/express');

  return {
    // When server initializes
    async init() {

      core.app.ws(proc.resource('/socket'), (ws, req) => {

        //when the a client loses connection or closes the window
        ws.on('close', () => {
          //this loop checks if the client is in any of the sessions and if it is it will remove it from the session
          Object.entries(sessions).forEach(([sessionID, obj]) => {
            const index = obj.session.instance.clients.indexOf(ws);
            if (index !== -1) {
              //we dont know the clients username because that is only stored on the client side so we just pass the index of the client in the username list array
              onDisconnect(sessions, sessionID, ws, index);
              return;
            }
          });

        });
        ws.on('message', (message) => {
          const data = JSON.parse(message);

          //handles creating a new session
          if (data.type === 'startsession') {
            //gens a new session id using crypto
            let inputID = generateUUID()
            //checks if the session already exists
            if (!sessions[inputID]) {
              //creates a lockines obj so a user can acquire and release locks on lines in the text
              const locklines = new Lock()
              sessions[inputID] = { session: '', lock: locklines }

              //creates a new session on the server and adds the websocket to that session list of clients
              //also takes the session file and gets the language of the file by checking its extension
              const session = new CreateNewSession(data.file)
              session.createSession(ws)
              //creates a share link for the session
              const sharelink = session.createShareLink(inputID)
              const language = session.getLanguage()
              sessions[inputID].session = session
              //sends the relavent data back to the client
              ws.send(JSON.stringify({ type: 'sessioncreated', sharelink: sharelink, language: language, sessionID: inputID }));
            }

          }
          //handles code changes
          if (data.type === 'codechange') {
            // Update the last operation timestamp
            lastOperationTimestamp = data.actions.Timestamp;

            // Get the document from the session
            const doc = sessions[data.sessionID].session.instance.sessionFile.data;

            // Broadcast the changes to all other clients
            sessions[data.sessionID].session.instance.clients.forEach((client) => {
              if (client !== ws) {

                client.send(JSON.stringify({ type: 'incodechange', actions: actions }));

              }

            });
            // Apply the edits to the document on the server so whenever a new client joins they will get the updated document
            const updated_doc = applyEdit(data.actions, doc);
            sessions[data.sessionID].session.instance.sessionFile.data = updated_doc;

          }
          //handles a user joining a session, sends all the relavent data to the client and boradcasts to all other clients that a new user has joined
          if (data.type === 'joinsession') {

            if (sessions[data.sessionID]) {
              sessions[data.sessionID].session.instance.clients.push(ws)

              const code = sessions[data.sessionID].session.instance.sessionFile.data

              const language = sessions[data.sessionID].session.language

              ws.send(JSON.stringify({ type: 'joinedsession', code: code, language: language }))

              sessions[data.sessionID].session.instance.clients.forEach((client) => {
                if (client !== ws) {

                  client.send(JSON.stringify({ type: 'joined', username: data.username }));

                }

              });

            }
          }
          if (data.type === 'acquirelock') {
            tryoperation(sessions[data.sessionID].lock, ws, sessions[data.sessionID].session);
          }
          //handles the disconnect event through the disconnect button
          if (data.type === 'disconnect') {
            onDisconnect(sessions, data.sessionID, ws, data.username)
          }

        })
      });
    },

    async start() {
    },

    destroy() {
    },
  };
};
