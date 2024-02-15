import { useRef } from "react"
import { getSession,setSession } from "../getsession"

export default function DidMount(editor,monaco){
    const editorRef = editor;
    editor.focus()
    const session =getSession()
    session.setEditor(editorRef)
}