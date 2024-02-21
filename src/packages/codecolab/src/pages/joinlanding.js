import React from 'react';
import { JoinSession } from '../utils/socket/socketoutgoing.js'
import GetUserName from '../utils/username/getusername.js'
import {getSession,setSession} from '../utils/getsession.js'
import { getApp, useSetApp } from '../hooks/useSetApp.js';

export function Joinlanding() {
                
                const resource = getApp()
                const username = GetUserName()
                const socket = resource.socket
                setSession(null, socket, username)
                const session = getSession()
                session.setSessionID(getApp().args)

                setTimeout(()=>{
                    const args = getApp().args
                    JoinSession(socket, args,username)
                },[2000])
    return (
        <div>
        </div>
    );
}