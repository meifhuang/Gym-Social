import React from 'react';
import { useNavigate } from "react-router-dom";


export default function Homepage(props) {
    const { message } = props
    const navigate = useNavigate();


    function loginRedirect() {
        navigate("/login");
    }

    function registerRedirect() {
        navigate("/register");
    }

    return (
        <div className="App">
            <h1> Welcome </h1>
            <h1> {message} </h1>
            <button onClick={loginRedirect}>Login</button>
            <button onClick={registerRedirect}>Register</button>
        </div>
    )
}
