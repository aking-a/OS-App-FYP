import { getSession } from "../utils/getsession"
import React, { useEffect } from "react"
import { clientChange } from '../utils/monaco/handleChanges.js';

export default function useActionListener(DidMount) {
  useEffect(() => {
    if (getSession().editorRef != null) {

      getSession().editorRef.onDidChangeModelContent((event) => {
        event.changes.forEach(change => {
          const startLine = change.range.startLineNumber;
          const endLine = change.range.endLineNumber;
          const startColumn = change.range.startColumn; // Start position of the change
          const endColumn = change.range.endColumn; // End position of the change
          const text = change.text;
          let action = change.text.trim().length === 0 && startColumn === endColumn ? 'newline' : (change.text.length > 0 ? 'insert' : 'delete');

          console.log(`Action: ${action}, Start Line: ${startLine}, End Line: ${endLine}, Start Column: ${startColumn}, End Column: ${endColumn}, Text: ${text}`);
          const actions = { Action: action, Start_Line: startLine, End_Line: endLine, Start_Column: startColumn, End_Column: endColumn, Text: text }

          console.log(getSession().ProgrammaticChange)
          if (!getSession().ProgrammaticChange) {
            console.log('hasactive')
            clientChange(actions)
          }
          if(getSession().ProgrammaticChange){
            getSession().ProgrammaticChange = false
          }
        });
      });

    }


  }, [DidMount])
}