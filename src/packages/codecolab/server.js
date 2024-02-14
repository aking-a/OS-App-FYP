const CreateNewSession = require('./server_modules/newsession.js')
const sessions = require('./server_modules/database.js')

module.exports = (core, proc) => {
  const {routeAuthenticated} = core.make('osjs/express');

  return {
    // When server initializes
    async init() {
      // HTTP Route example (see index.js)
      routeAuthenticated('POST', proc.resource('/test'), (req, res) => {
        res.json({hello: 'World'});
      });

      core.app.ws(proc.resource('/socket'), (ws, req) => {
        ws.on('message',(message)=>{
          const data = JSON.parse(message);

          if(data.type ==='startsession'){
            const session = new CreateNewSession(data.sessionIden)
            const inputID = session.createSession(ws)
            const sharelink = session.createShareLink(inputID)
            const language = session.getLanguage(ws)
            ws.send(JSON.stringify({ type: 'sessioncreated', sharelink:sharelink,language:language }));
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
