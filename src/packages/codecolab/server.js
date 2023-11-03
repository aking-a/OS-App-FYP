module.exports = (core, proc) => {
  const { routeAuthenticated } = core.make('osjs/express');
  const endpoint = proc.resource('/socket');

  return {
    // When server initializes
    async init() {
      core.app.ws(proc.resource('/socket'), (ws, req) => {
        const clientID = 1;
        ws.send(`User ${clientID} has connected working`);
      });
    },

    // When server starts
    async start() {
    },

    // When server goes down
    destroy() {
      ws.close(); // Closes socket
    },

  };
};
