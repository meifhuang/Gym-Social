import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";


export default function ExploreUsers() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('id'));
    const [notFollowing, setnotFollowing] = useState([]);
  
    const getOtherUsers =  async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:4000/explore",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        const notFollowing = res.data.users.filter(x => !res.data.following.find(y => y._id === x._id))
        setnotFollowing(notFollowing)
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
    getOtherUsers();
  },[]);


const viewProfile = async (userId) => {
    navigate(`/profile/${userId}`);
}

    return (
        <div>
             <button onClick={() => viewProfile(loggedInUser)}> Go to my profile </button>
              <h3> Explore other users' profile </h3> 
            { notFollowing && notFollowing.map((not) => { 
              return (
                <div className="users"> 
                <h3> {not.fname} {not.lname} <button onClick={() =>viewProfile(not._id)}> View profile </button>  </h3>
                </div> 
              )
            })
          }
          </div>
    )
}
