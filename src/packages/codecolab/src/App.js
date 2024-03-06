import React, { useState, useEffect } from 'react'; //using  react
import { Routes, Route, useNavigate } from 'react-router-dom'; //react router
import { FileSelector } from './pages/fileselector.js';//landing page for admin user to create a file sharing session
import { FileSession } from './pages/filesession.js';//landing page for the main monaco code editor
import { getApp } from './hooks/useSetApp.js';// getting the app data we added earlier
import useSocketListener from './hooks/useSocketListener.js'// lsitens for incming socket events
import { Joinlanding } from './pages/joinlanding.js';// route for non admins joining a session, nothing on this page just setting up monaco and then joining a session


function App() {
    const navigate = useNavigate()// react router hook to navigate between pages
    const [socket, setSocket] = useState(null); // State to hold the socket instance

    //storing the socket made earlier in index and putting it in a use state
    useEffect(() => {
        setSocket(getApp().socket);
    }, []);
    //The application will have options set to true if the user has joined throught a link and the args will conatin the session id so they can join a session
    useEffect(() => {
        if ((getApp().options.joinstate == true) && getApp().args != null) {
            navigate('/Landing')
        }
    }, []);

    //listens for incoming socket events
    useSocketListener(socket, navigate);



    return (
        //routes for the app
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