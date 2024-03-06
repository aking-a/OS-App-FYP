import { getSession } from "../getsession"
import React, { useEffect } from "react"
import "../../assets/highlightline.css"

export default function readOnlyLines(DidMount) {
    useEffect(() => {
        if (getSession().editorRef != null) {
            const editor = getSession().editorRef
            const lockedlines = getSession().lockedlines
            const monaco = getSession().monaco
            let decorationId = null;
            editor.onDidChangeCursorPosition(e => {
                if (lockedlines.has(e.position.lineNumber)) {
                    if (e.position.lineNumber > 1) {
                        editor.setPosition({ lineNumber: e.position.lineNumber - 1, column: e.position.column });
                    } else if (editor.getModel().getLineCount() > 1) {
                        editor.setPosition({ lineNumber: e.position.lineNumber + 1, column: e.position.column });
                    }
                    decorationId = editor.deltaDecorations(decorationId ? [decorationId] : [], [{
                        range: new monaco.Range(e.position.lineNumber, 1, e.position.lineNumber, 1),
                        options: {
                            className: 'highlight', // Add this line
                            isWholeLine: true,
                            hoverMessage: { value: 'This line is being edited by someone else' }
                        }
                    }])[0];
                }
                else {
                    editor.deltaDecorations(decorationId ? [decorationId] : [], []);
                    decorationId = null;
                }
            
            });
        }



    }, [DidMount])
}