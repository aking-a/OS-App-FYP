const { cli } = require('webpack');
const CreateNewSession = require('./server_modules/newsession.js')
const Lock = require('./server_modules/linelock.js')
const crypto = require('crypto');
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
        ws.on('message', (message) => {
          const data = JSON.parse(message);

          if (data.type === 'startsession') {
            let inputID = generateUUID()

            if (!sessions[inputID]) {
              const  locklines = new Lock()
              sessions[inputID] = { session: '', lock: locklines}
              const session = new CreateNewSession(data.file)
              session.createSession(ws)
              const sharelink = session.createShareLink(inputID)
              const language = session.getLanguage()
              sessions[inputID].session = session
              ws.send(JSON.stringify({ type: 'sessioncreated', sharelink: sharelink, language: language, sessionID: inputID }));
            }

          }
          if (data.type === 'codechange') {
            
            console.log(sessions[data.sessionID].lock)
            
            sessions[data.sessionID].session.instance.sessionFile.data = data.code
            sessions[data.sessionID].session.instance.clients.forEach((client) => {
              if (client !== ws) {

                client.send(JSON.stringify({ type: 'incodechange', actions: data.actions }));

              }

            });
          }
          if (data.type === 'joinsession') {

            if (sessions[data.sessionID]) {
              
              sessions[data.sessionID].session.instance.clients.push(ws)

              const code = sessions[data.sessionID].session.instance.sessionFile.data

              const language = sessions[data.sessionID].session.language

              ws.send(JSON.stringify({ type: 'joinedsession', code: code, language: language }))

              sessions[data.sessionID].session.instance.clients.forEach((client) => {
                if (client !== ws) {

                  client.send(JSON.stringify({ type: 'joined', username: data.username}));

                }

              });
             
            }
          }
          if (data.type === 'disconnect') {

            if (sessions[data.sessionID].session.instance.clients[0] == ws) {

              sessions[data.sessionID].session.instance.clients.forEach((client) => {

                client.send(JSON.stringify({ type: 'disconnected', status: 'true' }))
              });
              delete sessions[data.sessionID];

            }
            else {

              sessions[data.sessionID].session.instance.clients.forEach((client) => {
                if (client !== ws) {

                  client.send(JSON.stringify({ type: 'disconnected', status: 'alert', username: data.username}))

                }
                if (client == ws) {
                  client.send(JSON.stringify({ type: 'disconnected', status: 'false' }))
                }

              });
              const index = sessions[data.sessionID].session.instance.clients.indexOf(ws)
              delete sessions[data.sessionID].session.instance.clients[index]

            }
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
