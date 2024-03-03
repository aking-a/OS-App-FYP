import { userOpenFile } from '../../utils/openfile.js';
import { File } from '../../data/file.js';
import { getApp } from '../../hooks/useSetApp.js'
import GetUserName from '../../utils/username/getusername.js';
import { StartFileShare } from '../../utils/socket/socketoutgoing.js'
import { getSession, setSession } from '../../utils/getsession.js'


export default async function clickevent() {
    try {
      const promise = await userOpenFile();
      const file = promise.file;
      const data = promise.result;

      const textDecoder = new TextDecoder('utf-8');
      const text = textDecoder.decode(data);
      const newfile = new File(file, text)

      const app = getApp()
      const username = GetUserName()
      const socket = app.socket

      setSession(newfile, socket, username)
      const session = getSession()
      session.code = text
      StartFileShare(socket,newfile, username)
    } catch (error) {
      console.log(error);
    }
  }