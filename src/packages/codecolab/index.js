import osjs from 'osjs';
import './src/interactions.js';
import { name as applicationName } from './metadata.json';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.js';
import './src/App.css';

// Our launcher
const register = (core, args, options, metadata) => {
  // Create a new Application instance
  const proc = core.make('osjs/application', { args, options, metadata });

  // Create  a new Window instance
  proc.createWindow({
    id: 'codecolabWindow',
    title: metadata.title.en_EN,
    icon: proc.resource(proc.metadata.icon),
    dimension: { width: 700, height: 600 },
    position: { left: 700, top: 200 }
  })
    .on('destroy', () => proc.destroy())
    .render($content => ReactDOM.render(React.createElement(App), $content));

  // Creates a new WebSocket connection (see server.js)
  const sock = proc.socket('/socket');
  sock.on('message', (...args) => console.log(args))
  sock.on('open', () => sock.send('Ping'));

  // Use the internally core bound websocket
  //proc.on('ws:message', (...args) => console.log(args))
  //proc.send('Ping')

  // Creates a HTTP call (see server.js)
  //proc.request('/test', {method: 'post'})
  //.then(response => console.log(response));


  return proc;
};

// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);
