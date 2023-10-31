module.exports = (core, proc) => {
  const {routeAuthenticated} = core.make('osjs/express');

  return {
    // When server initializes
    async init() {
      // HTTP Route example (see index.js)
      // routeAuthenticated('POST', proc.resource('/test'), (req, res) => {
      //   res.json({hello: 'World'});
      // });

      // WebSocket Route example (see index.js)
      // NOTE: This creates a new connection. You can use a core bound socket instead
      core.app.ws(proc.resource('/socket'), (ws, req) => {
        ws.send('Hello World');
      });
    },

    // When server starts
    async start() {
    },

    // When server goes down
    destroy() {
    }
  };
};
