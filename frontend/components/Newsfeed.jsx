import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../src/AuthContext";


export default function Newsfeed() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    const getUsers =  async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:4000/newsfeed",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        console.log('reached getusers', res.data.users);
        setUsers(res.data.users);
      }
      else {
        console.log("no responses")
      }
    }
    catch (e) {
      console.log(e.message);
    }
  }  

  useEffect(() => {
    getUsers();
  },[]);

  const getWorkout =  async () => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:4000/profile/${loggedInId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        console.log('data', res.data.workouts);
        setUsername(res.data.username);
        setWorkouts(res.data.workouts);
      }
      else {
        console.log("no responses")
      }
    }

    catch (e) {
      console.log(e.message);
    }
  }

const viewProfile = async (userId) => {
  try {
    const response = await axios({
        method: "get",
        url: `http://localhost:4000/profile/${userId}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    if (response) {
      return navigate("/profile");
    } else {
      console.log("no response")
    }
  } catch (e) {
    console.log(e.message);
    console.log(e);
  }
} 
  
    return (
        <div>
            <h1> News feed</h1>
            <h4> Explore other user profiles </h4>
            <div className="users">
            {users && users.map((user) => {
                return ( 
                <h3> {user.fname} {user.lname} <button onClick={() => viewProfile(user._id)}> View profile </button> <button> Follow </button></h3>

                )
            })}
            </div>
        </div>
    )
}
