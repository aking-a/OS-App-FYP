import './index.scss';
import osjs from 'osjs';
import { name as applicationName } from './metadata.json';
import App from './src/App.js';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { AppData } from './src/data/appdata.js';
import { useSetApp } from './src/hooks/useSetApp.js';


// Our launcher
const register = (core, args, options, metadata) => {
  // Create a new Application instance
  const proc = core.make('osjs/application', { args, options, metadata });

  // Create  a new Window instance
  var win = proc.createWindow({
    id: 'codecolabWindow',
    title: metadata.title.en_EN,
    icon: proc.resource(proc.metadata.icon),
    dimension: { width: 800, height: 600 },
    position: { left: 700, top: 200 }
  }).on('destroy', () => proc.destroy())

  const socket = proc.socket('/socket')
  const app_data = new AppData(win, args, options, proc, osjs, socket, core)
  useSetApp(app_data)


  const $content = win.$content;
  const root = createRoot($content);
  win.render(root.render(<BrowserRouter><App /></BrowserRouter>));
  win.once('render', () => win.focus());

  return proc;
};
// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);