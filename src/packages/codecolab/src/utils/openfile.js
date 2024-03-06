import { getApp } from '../hooks/useSetApp.js'

export async function userOpenFile(options) {
    //we need these app variables to interact with the file system
    const data = getApp()
    const osjs = data.osjs
    const win = data.win

    //creating a promise
    return await new Promise(async (resolve, reject) => {
        //this was obtained from the OS.js documentation
        //basically it opens the filsystem dialog menu and returns the file along with its content as and ArrauBuffer
        osjs.make('osjs/dialog', 'file', options, {
            parent: win,
            attributes: {
                modal: true
            }
        }, (btn, v) => {
            //This just checks what button was selected, if its ok that means a file was selected and the file is returned
            //if its cancel or destroy then the promise is rejected, means file was not selected
            if (btn === 'ok' && v) {
                const file = v
                osjs.make('osjs/vfs').readfile(v, 'bin').then((result) => {
                    resolve({ file, result })
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