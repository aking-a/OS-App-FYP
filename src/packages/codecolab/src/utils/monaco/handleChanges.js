import { getSession } from "../getsession"
import { CodeChange } from '../socket/socketoutgoing.js'

function clientChange() {
    const session = getSession()
    const editor = session.editorRef
    CodeChange(editor.getValue(), session.socket, session.sessionID)
}
function incomingChange(code) {
    const session = getSession()
    const setCode = session.code
    setCode(code)
}
export { clientChange, incomingChange }