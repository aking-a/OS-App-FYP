import { getSession } from "../getsession"
import { CodeChange } from '../socket/socketoutgoing.js'
function clientChange(actions) {
    const session = getSession()
    //sending the change to the server
    CodeChange(actions, session.socket, session.sessionID, getSession().editorRef.getValue())
}
function incomingChange(actions) {
    const editor = getSession().editorRef
    const monaco = getSession().monaco

    //appling the chnages to the editor that have been recived by the server
    //As mentioned in other files its not nessacary to use disipher what action is being used
    if (actions.Action === 'insert') {
        //exexuteEdits is built into monaco and is used to apply the changes to the editor
        //takes and range and the text to be inserted/deleted etc
        editor.executeEdits('', [{
            range: new monaco.Range(actions.Start_Line, actions.Start_Column, actions.End_Line, actions.End_Column),
            text: actions.Text,
            forceMoveMarkers: true
        }]);
    }
    if (actions.Action === 'delete') {
        editor.executeEdits('', [{
            range: new monaco.Range(actions.Start_Line, actions.Start_Column, actions.End_Line, actions.End_Column),
            text: actions.Text,
            forceMoveMarkers: true
        }]);
    }
    if (actions.Action === 'newline') {

        editor.executeEdits('', [{
            range: new monaco.Range(actions.Start_Line, actions.Start_Column, actions.Start_Line, actions.Start_Column),
            text: actions.Text,
            forceMoveMarkers: true
        }]);
    }
}
export { clientChange, incomingChange }