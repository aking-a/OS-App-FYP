import { useEffect } from 'react';
import { getSession, Terminate } from '../utils/getsession.js'
import { incomingChange } from '../utils/monaco/handleChanges.js';
import { getApp } from './useSetApp.js';

const useSocketListener = (socket, navigate) => {
    useEffect(() => {
        if (socket) {
            const handleSocketData = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'sessioncreated') {
                    const session = getSession()

                    session.setLanguage(data.language)
                    session.setLink(data.sharelink)
                    session.setIsVisible(true)
                    session.setSessionID(data.sessionID)

                    navigate('/Session')

                }
                if (data.type === 'incodechange') {
                    incomingChange(data.code)


                }
                if (data.type === 'joinedsession') {
                    const session = getSession()
                    session.setLanguage(data.language)
                    session.setCode(data.code)
                    session.setIsVisible(false)

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
                        const set1 = getSession().popupMessage
                        const set2 = getSession().showPopup

                        set1(data.username + " has left the session")
                        set2(true)

                    }
                }
                if (data.type === 'joined') {
                    const set1 = getSession().popupMessage
                    const set2 = getSession().showPopup

                    set1(data.username + " has joined the session")
                    set2(true)

                }
                if (data.type === 'userlist') {
                    const session = getSession()
                    const set1 = session.UserList
                    set1(data.userList)
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