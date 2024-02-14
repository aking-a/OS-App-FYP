import {useRef} from "react";
export function handleEditorDidMount(editor){
    const editorRef = useRef(null);
    editorRef.current = editor;
    editor.focus();
}