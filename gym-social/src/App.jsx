import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Homepage from "./Homepage";
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => setMessage(response.data.message))
      .catch(error => console.log(error))
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Homepage message={message} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
