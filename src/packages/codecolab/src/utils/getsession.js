import {Session} from '../data/sessionclass.js'
let instance = ''
//creates a new session object and stores it in a global variable
function setSession(file,socket,username){
    instance = new Session(file, socket, username)
}
//gets the object
function getSession(){
    return instance
}
//destroys this session object
function Terminate(){
    instance = ''
}
export {setSession,getSession, Terminate}