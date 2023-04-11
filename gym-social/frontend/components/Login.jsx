import React from 'react';
import { useNavigate } from "react-router-dom";


export default function Login(props) {
    const { message, currentUser } = props
    const navigate = useNavigate();
    return (
        <div className="App">
            <h1> Login </h1>
            <h1> {currentUser} </h1>
        </div>
    )
}
