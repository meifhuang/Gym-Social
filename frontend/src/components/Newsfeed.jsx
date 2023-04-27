import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";


export default function Newsfeed() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('id'));
    const [username, setUsername] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [following, setFollowing] = useState([]);
    const [notFollowing, setnotFollowing] = useState([]);
  
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
        console.log('following', res.data.following);
        // setUsers(res.data.users);
        setFollowing(res.data.following)
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

const exploreUsers = async () => {
  navigate('/explore')
}

    return (
        <div>
            <h1> HOME </h1>
            <button onClick={() => viewProfile(loggedInUser)}> Go to my profile </button>
            { following.length > 0 ? following.map((follower) => {
                  return (
                    <div className="users">
                    <h2> {follower.fname} {follower.lname} {follower.workouts} <button onClick={() => viewProfile(follower._id)}> View profile </button> </h2>
                  </div> 
                    )
                  })
                 :
                <h2> Nothing on newsfeed. Go follow and explore! </h2>
          
                }
            <div >
              <button onClick={exploreUsers}> Explore other users </button> 
          </div>
        </div>
    )
}
