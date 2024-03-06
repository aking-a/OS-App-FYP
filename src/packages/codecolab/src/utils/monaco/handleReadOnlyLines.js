// Import necessary modules and CSS
import { getSession } from "../getsession"
import React, { useEffect } from "react"
import "../../assets/highlightline.css"

// Define the readOnlyLines function
export default function readOnlyLines(DidMount) {

    useEffect(() => {
        // Check if the editor reference exists in the current session
        if (getSession().editorRef != null) {
            // Get the editor reference, locked lines, and monaco instance from the session
            const editor = getSession().editorRef
            const lockedlines = getSession().lockedlines
            const monaco = getSession().monaco
            // Initialize a variable to hold the decoration ID
            let decorationId = null;

            // Add an event listener for when the cursor position changes in the editor
            editor.onDidChangeCursorPosition(e => {
                // Check if the current line is in the set of locked lines
                if (lockedlines.has(e.position.lineNumber)) {
                    // If the current line is not the first line, move the cursor up one line
                    if (e.position.lineNumber > 1) {
                        editor.setPosition({ lineNumber: e.position.lineNumber - 1, column: e.position.column });
                    } 
                    // If the current line is the first line and there are more lines, move the cursor down one line
                    else if (editor.getModel().getLineCount() > 1) {
                        editor.setPosition({ lineNumber: e.position.lineNumber + 1, column: e.position.column });
                    }
                    // Add a decoration to the current line and store the decoration ID
                    decorationId = editor.deltaDecorations(decorationId ? [decorationId] : [], [{
                        range: new monaco.Range(e.position.lineNumber, 1, e.position.lineNumber, 1),
                        options: {
                            className: 'highlight', // just highlights the line red on hover along with the hover message
                            isWholeLine: true,
                            hoverMessage: { value: 'This line is being edited by someone else' }
                        }
                    }])[0];
                }
                // If the current line is not in the set of locked lines, remove the decoration
                else {
                    editor.deltaDecorations(decorationId ? [decorationId] : [], []);
                    decorationId = null;
                }
            });
        }
    }, [DidMount])
}