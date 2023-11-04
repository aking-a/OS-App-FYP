import osjs from 'osjs';
import { name as applicationName } from './metadata.json';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.js';
import './src/App.css';
import { BrowserRouter } from 'react-router-dom';

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
    .render(($content) => { ReactDOM.render(<BrowserRouter><App socket={proc.socket('/socket')} /></BrowserRouter>, $content); });

  


  return proc;
};

// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);
