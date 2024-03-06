import { useEffect } from 'react';
import { getSession, Terminate } from '../utils/getsession.js'
import { incomingChange } from '../utils/monaco/handleChanges.js';
import { getApp } from './useSetApp.js';
import { addUsername, removeUsername } from '../utils/username/updatelist.js'
import { terminatewindow } from '../utils/events/renderlist.js'

const useSocketListener = (socket, navigate) => {
    useEffect(() => {
        if (socket) {
            const handleSocketData = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'sessioncreated') {
                    const session = getSession()
                    getSession().ProgrammaticChange = true
                    session.language = data.language
                    session.sharelink = data.sharelink
                    session.isVisible = true
                    session.sessionID = data.sessionID
                    navigate('/Session')

                }
                if (data.type === 'incodechange') {
                    getSession().ProgrammaticChange = true
                    incomingChange(data.actions)


                }
                if (data.type === 'joinedsession') {
                    const session = getSession()
                    getSession().ProgrammaticChange = true
                    session.language = data.language
                    session.code = data.code
                    session.isVisible = false
                    navigate('/Session')
                }
                if (data.type === 'disconnected') {

                    if (data.status == 'true') {

                        try {
                            terminatewindow()
                        } catch (e) {
                            console.log('DisconnectEvent: Closing any open windows')
                        }
                        Terminate()
                        getApp().options = {}
                        getApp().args = null
                        navigate('/')
                    }
                    else if (data.status == 'false') {
                        try {
                            terminatewindow()
                        } catch (e) {
                            console.log('DisconnectEvent: Closing any open windows')
                        }
                        Terminate()
                        getApp().options = {}
                        getApp().args = null
                        navigate('/')
                    }
                    else if (data.status == 'alert') {
                        const session = getSession()
                        if(typeof data.username == 'number'){
                            const index = data.username -1;
                            session.popupMessage(session.usernameslist[index] + " has left the session")
                            removeUsername(session.usernameslist[index])
                        }else{
                            session.popupMessage(data.username + " has left the session")
                            removeUsername(data.username)
                        }
                        session.showPopup(true)

                    }
                }
                if (data.type === 'joined') {

                    const session = getSession()
                    session.popupMessage(data.username + " has joined the session")
                    session.showPopup(true)
                    addUsername(data.username)

                }
                if (data.type === 'releaseline') {
                    setTimeout(() => {
                        getSession().lockedlines.delete(data.line)
                    }, 5000) 
                }

            };
            socket.on('message', handleSocketData);

            return () => {
                socket.off('message', handleSocketData);
            };
        }
    }, [socket]);
};

export default useSocketListener;