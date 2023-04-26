import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../src/AuthContext";


export default function Newsfeed() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('id'));
    const [username, setUsername] = useState("");
    const [workouts, setWorkouts] = useState([]);
  
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
        console.log(res.data.users.following);
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



const viewProfile = async (userId) => {
    navigate(`/profile/${userId}`);
}

  
    return (
        <div>
            <h1> News feed</h1>
            <button onClick={() => viewProfile(loggedInUser)}> Go to my profile </button>
          
            {users && users.map((user) => {
                return ( 
                <> 
                {users.following ? user.following.map((followers) => {
                  return (
                    <h2> {followers.name} </h2>
                  )
                }) :
                <h2> Nothing on newsfeed. </h2>
                }
                <h4> Explore other user profiles </h4>
                <div className="users">
                <h3> {user.fname} {user.lname} <button onClick={() =>viewProfile(user._id)}> View profile </button> </h3>
                </div>
                </>
                )
            })}
            
        </div>
    )
}
