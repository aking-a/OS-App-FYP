import { getSession } from "../utils/getsession"
import React, { useEffect } from "react"
import { clientChange } from '../utils/monaco/handleChanges.js';// the function that sends the action to the server

export default function useActionListener(DidMount) {
  useEffect(() => {
    //making sure the editor is mounted
    if (getSession().editorRef != null) {
      //getSession is getting the editorRef from the session and using onDidChangeModelContent to listen for changes in the editor
      //These changes cover all different types of changes like inserting, deleting and new lines, tab etc
      getSession().editorRef.onDidChangeModelContent((event) => {
        event.changes.forEach(change => {
          //all these varibales are used to get the range of the chnage and the text that was changed
          const startLine = change.range.startLineNumber;
          const endLine = change.range.endLineNumber;
          const startColumn = change.range.startColumn; // Start position of the change
          const endColumn = change.range.endColumn; // End position of the change
          const text = change.text;
          //This is not needed as the text will accomodate for all types of chages e.g if chage is a newline the text will be \n
          //but I included it to make the code more readable
          let action = change.text.trim().length === 0 && startColumn === endColumn ? 'newline' : (change.text.length > 0 ? 'insert' : 'delete');

          //simple making the actions into a object to send to the server
          const actions = { Action: action, Start_Line: startLine, End_Line: endLine, Start_Column: startColumn, End_Column: endColumn, Text: text }

          //This programmatic change was discussed in other files its used to stop infinite loops
          //It will only send a change to the server if the change was made by the user and not the server as there is no way for 
          //onDidChangeModelContent to distinguish between the two
          if (!getSession().ProgrammaticChange) {
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