import React from 'react';
import { JoinSession } from '../utils/socket/socketoutgoing.js'
import GetUserName from '../utils/username/getusername.js'
import {getSession,setSession} from '../utils/getsession.js'
import { getApp, useSetApp } from '../hooks/useSetApp.js';
import styles from '../assets/landing.module.css';
// this.file = file
// this.socket = socket
// this.username = username
// this.language = null
// this.sharelink = null
// this.editorRef = null---
// this.sessionID = null---
// this.showPopup = null
// this.popupMessage = null
// this.isVisible = null
// this.userList= null
export function Joinlanding() {
                
                const app = getApp()
                const username = GetUserName()
                const socket = app.socket
                setSession(null, socket, username)
                const session = getSession()
                session.sessionID = getApp().args

                setTimeout(()=>{
                    const args = getApp().args
                    JoinSession(socket, args,username)
                },[3000])
    return (
        <div className={styles.container}> 
            <p className={styles.loadingIcon}>Loading...</p>
        </div>
    );
}