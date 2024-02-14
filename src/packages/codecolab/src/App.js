import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FileSelector } from './pages/fileselector.js';
import { FileSession } from './pages/filesession.js';
import { getApp, useSetApp } from './hooks/useSetApp.js';
import useSocketListener from './hooks/useSocketListener.js'
import {getSession,setSession} from './utils/getsession.js'
import {nav} from './utils/nav.js'

function App() {
    const navigate = useNavigate()
    const session = getSession()
    const [socket, setSocket] = useState(null); // State to hold the socket instance

    useEffect(() => {
        setSocket(getApp().socket);
    }, []);

    useSocketListener(socket);
    if(session.nav!=null){
        console.log("ssdsdsdsd")
    }

    return (
        <Routes>
            <Route>
                <Route path="/" element={<FileSelector />} />
                <Route path="/Session" element={<FileSession />} />
            </Route>
        </Routes>
    )
}
export default App