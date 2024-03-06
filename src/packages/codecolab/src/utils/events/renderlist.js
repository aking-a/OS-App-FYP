import Windowlist from '../../components/popups/userlistwindow.js';
import { createRoot } from 'react-dom/client';
import React from 'react';

let windowRef = null;

function render(window) {
    //just renderting the window like the main window
    const $content = window.$content;
    const root = createRoot($content);
    window.render(root.render(<Windowlist/>));
    window.once('render', () => window.focus());
    windowRef = window;
}`
//closes the open window`
function terminatewindow() {
    windowRef.close()
    windowRef = null;
}

export {render,terminatewindow}