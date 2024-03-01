import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FileSelector } from './pages/fileselector.js';
import { FileSession } from './pages/filesession.js';
import { getApp, useSetApp } from './hooks/useSetApp.js';
import useSocketListener from './hooks/useSocketListener.js'
import { Joinlanding } from './pages/joinlanding.js';


function App() {
    const navigate = useNavigate()
    const [socket, setSocket] = useState(null); // State to hold the socket instance

    useEffect(() => {
        setSocket(getApp().socket);
    }, []);
    useEffect(() => {
        if ((getApp().options.joinstate == true) && getApp().args != null) {
            navigate('/Landing')
        }
    }, []);

    useSocketListener(socket, navigate);



    return (
        <Routes>
            <Route>
                <Route path="/" element={<FileSelector />} />
                <Route path="/Session" element={<FileSession />} />
                <Route path="/Landing" element={<Joinlanding />} />
            </Route>
        </Routes>
    )
}
export default App