import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../../frontend/components/Register";
import Homepage from "../../frontend/components/Homepage";


export default function Route() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}
