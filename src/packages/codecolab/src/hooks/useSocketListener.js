import { useEffect } from 'react';
import { getSession, setSession } from '../utils/getsession.js'

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
                    const editor = getSession().editorRef
                    editor.setValue(data.code)
                }
                if (data.type === 'joinedsession') {
                    const session = getSession()
                    session.setLanguage(data.language)
                    session.setCode(data.code)

                    navigate('/Session')

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