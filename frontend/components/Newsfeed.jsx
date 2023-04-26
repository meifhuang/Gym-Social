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
        const getId = res.data.following.map((y) => {return (y._id)});
        console.log(getId);
        const notFollow = res.data.users.filter(x => !res.data.following.find(y => y._id === x._id))
        console.log(notFollow);
        setnotFollowing(notFollow);
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
            { following.length > 0 ? following.map((follower) => {
                  return (
                    <h2> {follower.fname} {follower.lname} {follower.workouts[0].name} </h2>
                  )
                  })
                 :
                <h2> Nothing on newsfeed. Go follow and explore! </h2>
          
                }
            <div >
              <h3> Explore other users' profile </h3> 
            { notFollowing && notFollowing.map((not) => { 
              return (
                <div className="users"> 
                <h3> {not.fname} {not.lname} <button onClick={() =>viewProfile(not._id)}> View profile </button> </h3>
                </div> 
              )
            })
          }
          </div>
        </div>
    )
}
