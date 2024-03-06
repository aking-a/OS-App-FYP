import { getSession } from "../getsession"

//just handling the mounting of the editor
export default function DidMount(editor, monaco) {

    const session = getSession()
    session.editorRef = editor
    editor.focus()
    session.monaco = monaco

}