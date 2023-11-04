import React, { useState } from 'react';


export function Room({handleCodeChange,code}) {

    return (
        <div className="container">
            <div className="editor-container">
                <textarea id="code-editor" className="editor" value={code} onChange={handleCodeChange}></textarea>
            </div>
        </div>
    );
}