import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";



export default function Profile() {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axios({
                url: "http://localhost:4000/logout",
                method: "GET",
            });
            if (response) {
                navigate("/")
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="App">
            <h1> Welcome!</h1>
            <button onClick={logout}> Logout </button>
        </div>
    )
}
