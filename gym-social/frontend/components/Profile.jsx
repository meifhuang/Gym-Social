import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from '../src/UserContext'


export default function Profile(props) {

    const navigate = useNavigate();

    const { username, setUsername } = useContext(UserContext);

    const logout = async () => {

        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:4000/logout",

            });
            if (response) {
                setUsername(null)
                return navigate("/")
            }
            else {
                throw Error('no response')
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="App">
            <h1> Welcome {username} ! </h1>
            <button onClick={logout}> Logout </button>
        </div>
    )
}
