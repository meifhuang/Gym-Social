import { useState, useEffect } from "react";
import { UserContext } from './UserContext';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import Homepage from "../components/Homepage";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";
import "./App.css";

function App() {
  // const [message, setMessage] = useState("");
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile")
      .then((response) => {
        setExercises(response.data.workout_list)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile exercises={exercises}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
