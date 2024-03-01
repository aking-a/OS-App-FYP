import Windowlist from '../../components/popups/userlistwindow.js';
import { createRoot } from 'react-dom/client';
import React from 'react';


export default function re_render(window) {

    const $content = window.$content;
    const root = createRoot($content);
    window.render(root.render(<Windowlist/>));
    window.once('render', () => window.focus());
}