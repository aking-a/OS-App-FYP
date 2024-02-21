const { cli } = require('webpack');
const CreateNewSession = require('./server_modules/newsession.js')
const crypto = require('crypto');
const sessions = {}

module.exports = (core, proc) => {
  const { routeAuthenticated } = core.make('osjs/express');

  return {
    // When server initializes
    async init() {


      core.app.ws(proc.resource('/socket'), (ws, req) => {
        ws.on('message', (message) => {
          const data = JSON.parse(message);

          if (data.type === 'startsession') {
            let inputID = crypto.randomUUID();

            if (!sessions[inputID]) {
      
              sessions[inputID] = { session: '' }
              const session = new CreateNewSession(data.sessionIden)
              session.createSession(ws)
              const sharelink = session.createShareLink(inputID)

              const language = session.getLanguage()
              sessions[inputID].session = session
              ws.send(JSON.stringify({ type: 'sessioncreated', sharelink: sharelink, language: language, sessionID: inputID }));
            }

          }
          if (data.type === 'codechange') {
            
            sessions[data.sessionID].session.instance.sessionIden.file.data = data.code

            sessions[data.sessionID].session.instance.clients.forEach((client) => {
              if (client !== ws) {

                client.send(JSON.stringify({ type: 'incodechange', code: data.code }));

              }

            });
          }
          if (data.type === 'joinsession') {

            if (sessions[data.sessionID]) {
              
              sessions[data.sessionID].session.instance.clients.push(ws)

              const code = sessions[data.sessionID].session.instance.sessionIden.file.data
          
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
