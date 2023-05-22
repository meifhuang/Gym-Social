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
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import NewsFeed from "./components/Newsfeed";
import ExploreUsers from "./pages/ExploreUsers";

import "./App.css";

//Styled Components
import GlobalStyles from "./styledComponents/GlobalStyles";
import { ThemeProvider } from "styled-components";

//loaders
import { getExerciseList } from "./loader/index";
function App() {
  const [message, setMessage] = useState("");

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
      lg: "1024px",
      xl: "1264px",
      xxl: "1400px",
    },
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        // {
        //   path: "/signup",
        //   element: <Signup />,
        // },
        // {
        //   path: "/login",
        //   element: <Login />,
        // },
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
      ],
    },
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
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile/:id",
      element: <Profile />,
      loader: getExerciseList
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
          <Route path="/signup" element={<Signup />} />
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
