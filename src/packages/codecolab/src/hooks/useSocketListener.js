import { useEffect } from 'react';
import { getSession, setSession } from '../utils/getsession.js'
import { incomingChange } from '../utils/monaco/handleChanges.js';

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
                    //incomingChange(data.code)
                    console.log(data.code)
                    
                }
                if (data.type === 'joinedsession') {
                    const session = getSession()
                    session.setLanguage(data.language)
                    session.setCode(data.code)

                    navigate('/Session')
                    setTimeout(()=>{
                        console.log("hdhdhdhdhdhdh")
                    },[1000])

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