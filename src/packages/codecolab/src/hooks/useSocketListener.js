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
                    session.setSessionID(data.sessionID)
                    console.log(data.sharelink)
                    navigate('/Session')
                }
                if (data.type === 'incodechange') {
                    incomingChange(data.code)


                }
                if (data.type === 'joinedsession') {
                    const session = getSession()
                    session.setLanguage(data.language)
                    session.setCode(data.code)

                    navigate('/Session')
                }
                if (data.type === 'disconnected') {
                    console.log(data.status)
                    if (data.status == 'true') {
                        console.log("trueact")
                        Terminate()
                        getApp().options = {}
                        getApp().args = null
                        navigate('/')
                    }
                    else if (data.status == 'false') {
                        console.log("falseact")
                        Terminate()
                        getApp().options = {}
                        getApp().args = null
                        navigate('/')
                    }
                    else if (data.status == 'alert') {
                        console.log("dhduhuhdufhdfhdufhfdu")
                    }
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