import { useState, useEffect } from "react";
import { AuthContextProvider } from "./AuthContext";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
// axios.defaults.withCredentials = true;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import Homepage from "../components/Homepage";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";
import NewsFeed from "../components/NewsFeed";
import ExploreUsers from "../components/ExploreUsers";

import "./App.css";

//Styled Components
import GlobalStyles from "../styledComponents/GlobalStyles";
import { ThemeProvider } from "styled-components";

function App() {

  const [message, setMessage] = useState("");


  // const [message, setMessage] = useState("");
 
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/")
  //     .then((response) => {
  //       setMessage(response.data.workout);
  //     })
  //     .catch((error) => console.log(error.message));
  // }, []);

  const theme = {
    // font: {

    // },
    colors: {
      lightgrey : "#e9e4e4;"
    },
    mobile: "768px",
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="/newsfeed" element={<NewsFeed/>} />
        <Route path="/explore" element={<ExploreUsers/>} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
