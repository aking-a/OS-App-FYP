import { getSession } from "../getsession"

export default function DidMount(editor, monaco) {

    const session = getSession()
    session.editorRef = editor
    editor.focus()
}