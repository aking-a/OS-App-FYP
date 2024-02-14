import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FileSelector } from './pages/fileselector.js';

function App() {

    const navigate = useNavigate()

    return (
        <Routes>
            <Route>
                <Route path="/" element={<FileSelector/>} />
            </Route>
        </Routes>
    )
}
export default App