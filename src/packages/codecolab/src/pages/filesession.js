import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import {handleEditorDidMount} from '../utils/monaco/handleMount.js'


export function FileSession() {
  const options = {
    selectOnLineNumbers: true,
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };
  return (
      <div >
        <MonacoEditor
          width="800"
          height="600"
          language= 'python'
          theme="vs-dark"
          value={code}
          options={options}
          onMount={handleEditorDidMount}
        />
       </div>
  );
}