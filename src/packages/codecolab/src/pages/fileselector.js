import React from 'react';
import { userOpenFile } from '../utils/openfile.js';
import { File } from '../data/file.js';
import {Session} from '../data/sessionclass.js'
import {getApp, useSetApp} from '../hooks/useSetApp.js'
import GetUserName from '../utils/username/getusername.js';
import StartFileShare from '../utils/socket/socketoutgoing.js'

export function FileSelector() {

  async function clickevent() {
    const [file,data] = await userOpenFile().then((promise) => {
      return [promise.file,promise.result]
    }).catch((error) => {
      console.log(error)
    });
    const textDecoder = new TextDecoder('utf-8');
    const text = textDecoder.decode(data);
    const newfile = new File(file,text)

    const resource = getApp()
    const socket = resource.socket
    const username = GetUserName()
    const sessionId = new Session(file, socket, username)
    StartFileShare(sessionId)



  }
  return (

    <div className="container">
      {/* {showFileContainer && (
        <div className={styles['file-container']}>
          <button className={styles['file-button']}onClick={handleFileChange} >choose file</button>
        </div>
      )} */}
      <button onClick={clickevent} >choose file</button>
      hello
    </div>
  );
}