import {getApp, useSetApp} from '../hooks/useSetApp.js'
import { getSession } from './getsession.js'

export async function userSaveFile(options) {
    const data = getApp()
    const core = data.core
    const vfs = core.make('osjs/vfs');
    const file = getSession().file.file
    console.log(file)
    const source = getSession().editorRef.getValue()

    vfs.writefile(file, source)
}