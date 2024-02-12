import osjs from 'osjs';
import { name as applicationName}  from './metadata.json';
import React, { useState }  from 'react';
import App from './src/App.js';
import './src/Styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
// Our launcher
const register = (core, args, options, metadata) => {

  // Create a new Application instance
  const proc = core.make('osjs/application', { args, options, metadata });
  const _ = core.make('osjs/locale').translate;
  const vfs = core.make('osjs/vfs');
  const basic = core.make('osjs/basic-application', proc, win, {
    defaultFilename: 'New File.txt'
  });
  // Create  a new Window instance
  const win = proc.createWindow({
    id: 'codecolabWindow',
    title: metadata.title.en_EN,
    icon: proc.resource(proc.metadata.icon),
    dimension: { width: 850, height: 650 },
    position: { left: 700, top: 200 }
  })
  const $content = win.$content; // Assuming $content is the container where you want to render
  const root = createRoot($content);
  win.on('destroy', () => proc.destroy())
  win.render( root.render(<BrowserRouter><App osjs={osjs} proc={proc} core={core} socket={proc.socket('/socket')} _={_} vfs={vfs} basic={basic} win={win}/></BrowserRouter>));
  win.once('render', () => win.focus());



  return proc;
};

// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);
