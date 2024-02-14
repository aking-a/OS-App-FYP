import { useEffect } from 'react';
import {getSession,setSession} from '../utils/getsession.js'
const session = getSession()

const useSocketListener = (socket) => {
    useEffect(() => {
        if (socket) {
            const handleSocketData = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'sessioncreated') {
                    session.setLanguage(data.language)
                    session.setLink(data.sharelink)
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