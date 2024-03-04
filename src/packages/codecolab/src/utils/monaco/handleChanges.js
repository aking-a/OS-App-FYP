import { getSession } from "../getsession"
import { CodeChange } from '../socket/socketoutgoing.js'
//Action: action, Start_Line: startLine, End_Line: endLine, Start_Column: startColumn, End_Column: endColumn, Text: text
function clientChange(actions) {
    const session = getSession()
    CodeChange(actions, session.socket, session.sessionID,getSession().editorRef.getValue())
}
function incomingChange(actions) {
    const editor = getSession().editorRef
    const monaco = getSession().monaco
    if(actions.Action === 'insert') {
        editor.executeEdits('', [{
            range: new monaco.Range(actions.Start_Line, actions.Start_Column, actions.End_Line, actions.End_Column),
            text: actions.Text,
            forceMoveMarkers: true
        }]);
    }
    if(actions.Action === 'delete') {
        editor.executeEdits('', [{
            range: new monaco.Range(actions.Start_Line, actions.Start_Column, actions.End_Line, actions.End_Column),
            text: null,
            forceMoveMarkers: true
        }]);
    }
    if(actions.Action === 'newline') {
        editor.executeEdits('', [{
            range: new monaco.Range(actions.Start_Line, actions.Start_Column, actions.Start_Line, actions.Start_Column),
            text: '\n',
            forceMoveMarkers: true
        }]);
    }
}
export { clientChange, incomingChange }