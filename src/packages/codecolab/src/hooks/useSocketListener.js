import { useEffect } from 'react';
import { getSession, Terminate } from '../utils/getsession.js'
import { incomingChange } from '../utils/monaco/handleChanges.js';
import { getApp } from './useSetApp.js';
import { addUsername, removeUsername } from '../utils/username/updatelist.js'

const useSocketListener = (socket, navigate) => {
    useEffect(() => {
        if (socket) {
            const handleSocketData = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'sessioncreated') {
                    const session = getSession()

                    session.language = data.language
                    session.sharelink = data.sharelink
                    session.isVisible = true
                    session.sessionID = data.sessionID
                    navigate('/Session')

                }
                if (data.type === 'incodechange') {
                    incomingChange(data.code)


                }
                if (data.type === 'joinedsession') {
                    const session = getSession()
                    session.language = data.language
                    session.code = data.code
                    session.isVisible = false
                    navigate('/Session')
                }
                if (data.type === 'disconnected') {

                    if (data.status == 'true') {

                        Terminate()
                        getApp().options = {}
                        getApp().args = null
                        navigate('/')
                    }
                    else if (data.status == 'false') {

                        Terminate()
                        getApp().options = {}
                        getApp().args = null
                        navigate('/')
                    }
                    else if (data.status == 'alert') {
                        const session = getSession()
                        session.popupMessage(data.username + " has left the session")
                        session.showPopup(true)
                        removeUsername(data.username)

                    }
                }
                if (data.type === 'joined') {
                    
                    const session = getSession()
                    session.popupMessage(data.username + " has joined the session")
                    session.showPopup(true)
                    addUsername(data.username)

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