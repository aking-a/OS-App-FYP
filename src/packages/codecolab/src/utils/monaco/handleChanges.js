import { getSession,setSession } from "../getsession"
import { CodeChange } from '../socket/socketoutgoing.js'

function clientChange(){
    const session = getSession()
    const editor = session.editorRef
    CodeChange(editor.getValue(), session.socket, session.sessionID)
}
function incomingChange(code){
    const session = getSession()
    const ref = session.state
    ref(code)
}
export {clientChange,incomingChange}