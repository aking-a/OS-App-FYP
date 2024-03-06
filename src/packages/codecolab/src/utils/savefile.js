import {getApp, useSetApp} from '../hooks/useSetApp.js'
import { getSession } from './getsession.js'

export async function userSaveFile(options) {
    //required variables to save the file 
    const data = getApp()
    const core = data.core
    const vfs = core.make('osjs/vfs');
    //getting the file path
    const file = getSession().file.file
    console.log(file)
    const source = getSession().editorRef.getValue()
    //saving the file
    vfs.writefile(file, source)
}