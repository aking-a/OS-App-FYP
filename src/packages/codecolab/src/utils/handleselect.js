import { userSaveFile } from '../utils/savefile.js';
import {render} from './events/renderlist.js';
import { getApp } from '../hooks/useSetApp.js';

//This function is used to handle the select event from the dropdown menu
export default function handleSelect(option){
    if (option.label === 'save') {
        //saves the file
        userSaveFile()
    }
    if (option.label === 'user list') {
        //creates a window to display the users connected to the session	
        var win = getApp().proc.createWindow({
            id: 'windowlist',
            title: 'users connected to the session',
            dimension: { width: 400, height: 'auto' },
            position: { left: 200, top: 400 }
          })
          //renders the window
        render(win)
    }
};