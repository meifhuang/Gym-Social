import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from '../src/UserContext'


export default function Navbar(props) {

    const navigate = useNavigate();

    return (
        <div>
            <h2> Gym Social </h2>
        </div>
    )
}
