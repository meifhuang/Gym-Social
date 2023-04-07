import React from 'react';
import { useNavigate } from "react-router-dom";


export default function Homepage(props) {
    const { message } = props
    const navigate = useNavigate();
    return (
        <div className="App">
            <h1> Welcome </h1>
            <h1> {message} </h1>
        </div>
    )
}
