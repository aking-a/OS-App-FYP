import React from 'react';
import { JoinSession } from '../utils/socket/socketoutgoing.js'
import GetUserName from '../utils/username/getusername.js'
import { getSession, setSession } from '../utils/getsession.js'
import { getApp } from '../hooks/useSetApp.js';
import styles from '../assets/landing.module.css';

export function Joinlanding() {

    const app = getApp()
    const username = GetUserName()
    const socket = app.socket
    setSession(null, socket, username)
    const session = getSession()
    session.sessionID = getApp().args

    setTimeout(() => {
        const args = getApp().args
        JoinSession(socket, args, username)
    }, [2000])
    return (
        <div className={styles.container}>
            <p className={styles.loadingIcon}>Loading...</p>
        </div>
    );
}