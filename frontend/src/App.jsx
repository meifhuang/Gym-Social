import { useState, useEffect } from "react";
import { AuthContextProvider } from "./AuthContext";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
// axios.defaults.withCredentials = true;
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import NewsFeed from "./components/NewsFeed";
import ExploreUsers from "./pages/ExploreUsers";

import "./App.css";

//Styled Components
import GlobalStyles from "./styledComponents/GlobalStyles";
import { ThemeProvider } from "styled-components";

//loaders
import { getExerciseList } from "../loader/index.js";
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
      lightgrey: "#e9e4e4;",
    },
    breakpoint: {
      xxxs: "0px",
      xxs: "500px",
      mobile: "768px",
      md: "1000px",
    },
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      // loader: rootLoader,
      // children: [
      //   {
      //     path: "team",
      //     element: <Team />,
      //     loader: teamLoader,
      //   },
      // ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile/:id",
      element: <Profile />,
      loader: getExerciseList,
    },
    {
      path: "/newsfeed",
      element: <NewsFeed />,
    },
    {
      path: "/explore",
      element: <ExploreUsers />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/newsfeed" element={<NewsFeed />} />
          <Route path="/explore" element={<ExploreUsers />} />
        </Routes>
      </BrowserRouter> */}
    </ThemeProvider>
  );
}

export default App;
