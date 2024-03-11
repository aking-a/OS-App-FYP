// Import necessary modules and CSS
import { getSession } from "../getsession"
import React, { useEffect } from "react"
import "../../assets/highlightline.css"
import { acquireLock, releaseLock } from "../socket/socketoutgoing"

// Define the readOnlyLines function
export default function readOnlyLines(DidMount) {

    useEffect(() => {
        // Check if the editor reference exists in the current session
        if (getSession().editorRef != null) {
            // Get the editor reference, locked lines, and monaco instance from the session
            const editor = getSession().editorRef
            const lockedlines = getSession().lockedlines
            const monaco = getSession().monaco
            let currentLine = editor.getPosition().lineNumber;
            let previousLine = null;
            let decorationId = null;

            editor.onDidChangeCursorPosition(e => {
                previousLine = currentLine;
                currentLine = e.position.lineNumber;

                // If the current line is in the set of locked lines
                if (lockedlines.has(currentLine)) {
                    // If the current line is not the first line, move the cursor up one line
                    if (currentLine > 1) {
                        editor.setPosition({ lineNumber: currentLine - 1, column: e.position.column });
                    }
                    // If the current line is the first line and there are more lines, move the cursor down one line
                    else if (editor.getModel().getLineCount() > 1) {
                        editor.setPosition({ lineNumber: currentLine + 1, column: e.position.column });
                    }
                }
                // If the current line is not in the set of locked lines, acquire the lock
                else if (!lockedlines.has(currentLine)) {
                    acquireLock(getSession().socket, getSession().sessionID, currentLine);
                }
                // If the line has changed and the old line is not locked, release the lock
                if (previousLine !== null && previousLine !== currentLine && !lockedlines.has(previousLine)) {
                    console.log('releasing lock from client')
                    releaseLock(getSession().socket, getSession().sessionID, previousLine);
                }
            });
        }
    }, [DidMount])
}