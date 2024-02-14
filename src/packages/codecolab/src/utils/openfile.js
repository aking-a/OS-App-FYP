import {getApp, useSetApp} from '../hooks/useSetApp.js'

export async function userOpenFile(options) {
    const data = getApp()
    const osjs = data.osjs
    const win = data.win

    return await new Promise(async (resolve, reject) => {
        osjs.make('osjs/dialog', 'file', options, {
            parent: win,
            attributes: {
                modal: true
            }
        }, (btn, v) => {
            if (btn === 'ok' && v) {
                const file = v
                osjs.make('osjs/vfs').readfile(v, 'bin').then((result)=>{
                    resolve({file,result})
                })
            } 
            else if ((btn == 'cancle' || btn == 'destroy')) {
                reject("File not selected");
              }
              else {
                reject("File not selected");
              }
        });
    });
}