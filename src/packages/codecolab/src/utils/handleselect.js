import { userSaveFile } from '../utils/savefile.js';
import {render} from './events/renderlist.js';
import { getApp } from '../hooks/useSetApp.js';

export default function handleSelect(option){
    if (option.label === 'save') {
        userSaveFile()
    }
    if (option.label === 'user list') {
        var win = getApp().proc.createWindow({
            id: 'windowlist',
            title: 'users connected to the session',
            dimension: { width: 400, height: 'auto' },
            position: { left: 200, top: 400 }
          })
        render(win)
    }
};