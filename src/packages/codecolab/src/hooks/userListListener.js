import { useEffect } from 'react';
import { getSession} from '../utils/getsession.js'
import { getApp } from './useSetApp.js';
import React from 'react';

export default function listlistener(usernames, winlist) {
    useEffect(() => {

        if (usernames.length > 0 && winlist !== null) {
            console.log('usernames: ', usernames, 'winlist: ', winlist);
            winlist.render($content => {
                // Create a new unordered list
                const ul = document.createElement('ul');

                // For each username...
                usernames.forEach((username, index) => {
                    // Create a new list item
                    const li = document.createElement('li');

                    // Add some styles to the list item
                    li.style.fontWeight = 'bold'; // Make the text bold
                    li.style.fontFamily = 'Arial, sans-serif'; // Change the font
                    li.style.fontSize = '20px'; // Increase the font size

                    // Create a new text node with the username
                    const textNode = document.createTextNode(username);

                    // Append the text node to the list item
                    li.appendChild(textNode);

                    // Append the list item to the unordered list
                    ul.appendChild(li);
                });

                // Append the unordered list to the $content element
                $content.appendChild(ul);
            });
        }
    }, [usernames, winlist]);
}