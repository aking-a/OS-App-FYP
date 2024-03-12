import { useEffect } from 'react';
import { getSession, Terminate } from '../utils/getsession.js'// This is used to get all the session object which is used to update and store the session variables that are used accross the app
import { incomingChange } from '../utils/monaco/handleChanges.js';//This just handles incomiumg changes (where monaco is updated with changes from the server) also where lines are locked
import { getApp } from './useSetApp.js';//app variables
import { addUsername, removeUsername } from '../utils/username/updatelist.js'//This is used for the list of usernames in the session adds and removes usernames from list 
import { terminatewindow } from '../utils/events/renderlist.js'//Used for closing any open windows (for now that is just the user list window)
import { acquireLock } from '../utils/socket/socketoutgoing.js';
//socket lsitner funtions
const useSocketListener = (socket, navigate) => {
    //this listens for incoming socket events
    useEffect(() => {
        if (socket) {
            const handleSocketData = (event) => {
                //converting the incoming message to json
                const data = JSON.parse(event.data);

                //all of the below statments will use data.type to perform the corret action when a socket event is recieved
                if (data.type === 'sessioncreated') {
                    //getting the session variables and using them 
                    const session = getSession()
                    //This is use to stop the editor from sending changes to the server when it recives changes from the server
                    //The reason this is used is because it will cause an infinite loop of changes being sent back and forth
                    getSession().ProgrammaticChange = true
                    //setting up the variables that will be displyed and some varibles that the editor needs
                    session.language = data.language
                    session.sharelink = data.sharelink
                    session.isVisible = true//This toggles if the dropdown menu is visible or not
                    session.sessionID = data.sessionID
                    //getting the length of the file and setting the current line to the end of the file
                    // getSession().curline = getSession().file.data.split('\n').length
                    // console.log(getSession().curline)
                    //navigate to the main page
                    navigate('/Session')

                }
                //handles the incmoing changes from the server mainly the code being updated by another user
                if (data.type === 'incodechange') {
                    getSession().ProgrammaticChange = true//This was explained above and is nessaary here
                    incomingChange(data.actions)



                }
                //Sets up the session for when a user joines a session throught the share link
                if (data.type === 'joinedsession') {
                    const session = getSession()
                    console.log(data.lockedlines)
                    data.lockedlines.forEach(value => session.lockedlines.add(value))
                    session.lockedlines
                    getSession().ProgrammaticChange = true
                    session.language = data.language
                    session.code = data.code
                    session.isVisible = false
                    navigate('/Session')
                }
                //Handles the user disconnect
                if (data.type === 'disconnected') {

                    //There are three cases for a disconnect event
                    //1: if true this means the admin or person that setup the session has and all users are kicked out of the session
                    if (data.status == 'true') {

                        try {
                            terminatewindow()
                        } catch (e) {
                            console.log('DisconnectEvent: Closing any open windows')
                        }
                        Terminate()//This terminate funcion gets rid of all the session variables and naviagates them back to the main page
                        getApp().options = {}
                        getApp().args = null
                        navigate('/')
                    }
                    //2: if this this is false it just means the user that joined the session has left and only they will recive this and leave the session
                    else if (data.status == 'false') {
                        try {
                            terminatewindow()//closes any open windows
                        } catch (e) {
                            console.log('DisconnectEvent: Closing any open windows')
                        }
                        Terminate()
                        getApp().options = {}
                        getApp().args = null
                        navigate('/')
                    }
                    //3: All users that are connected to the session including the adimin will recieve this when a user has either disconnected from the session
                    else if (data.status == 'alert') {
                        const session = getSession()
                        //This also removes the user from the list of username
                        //There are two cases for this, when a user diconnects from the disconnect button and when a user closes the window or loses connection
                        //if the latter happens we will recive a number and if the former we will recive a string
                        //we must get the user at that index if the latter occurs hence the reason for the below statements
                        if (typeof data.username == 'number') {
                            const index = data.username - 1;
                            session.popupMessage(session.usernameslist[index] + " has left the session")//disconnect message
                            removeUsername(session.usernameslist[index])// the function that removes the user from the list
                        } else {
                            session.popupMessage(data.username + " has left the session")
                            removeUsername(data.username)
                        }
                        session.showPopup(true)

                    }
                }
                //This is used to add usernames to the list and display a popup message when a user joins the session
                if (data.type === 'joined') {

                    const session = getSession()
                    session.popupMessage(data.username + " has joined the session")
                    session.showPopup(true)
                    addUsername(data.username)

                }
                //relases the locked line to allow editing of that line
                if (data.type === 'releaseline') {
                    console.log('releasing line')
                    getSession().lockedlines.delete(data.line)
                }
                //add locked lines to the list of locked lines
                if (data.type === 'hasline') {
                    //check if the editor is on the line that is locked and moves the cursor up one line if it is
                    //The reason for this is because when two users can get into the same line before the broadcast is recieved
                    //by users that do not have the line lock
                    if(getSession().editorRef.getPosition().lineNumber == data.line){
                        getSession().editorRef.setPosition({ lineNumber: data.line -1, column: 1 });
                    }
                    getSession().lockedlines.add(data.line)
                }

            };
            //when socket recived a message disipher the message and perform the relavant action
            socket.on('message', handleSocketData);

            return () => {
                socket.off('message', handleSocketData);
            };
        }
    }, [socket]);
};

export default useSocketListener;