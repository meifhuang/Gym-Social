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
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/")
      .then((response) => {
        setMessage(response.data.message)
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage message={message} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
