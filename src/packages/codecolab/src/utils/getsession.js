import {Session} from '../data/sessionclass.js'
let instance = ''
function setSession(file,socket,username){
    instance = new Session(file, socket, username)
}
function getSession(){
    return instance
}
export {setSession,getSession}