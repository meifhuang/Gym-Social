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
    const [profileView, setProfileView] = useState(false);

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



const viewProfile = async (userId) => {
    navigate(`/profile/${userId}`);
}

  
    return (
        <div>
            {
             profileView ? <div> 
             <h1> {username} </h1>
             {workouts && workouts.map((workout) => {
          return (
            <div className="workouts"> 
           <h3> {workout.name} </h3>
           {workout.exercises.map((exercise) => {
            return (
            <>          
             <p> 
              {exercise.name} - {exercise.weight} lbs - {exercise.sets} sets - {exercise.reps} - reps
              </p>
            </>
            )
           })}
          </div>
          )})}
            </div> :
             <>
            <h1> News feed</h1>
            <h4> Explore other user profiles </h4>
            <button onClick={() => viewProfile(loggedInUser)}> Go to my profile </button>
            <div className="users">
            {users && users.map((user) => {
                return ( 
                <h3> {user.fname} {user.lname} <button onClick={() =>viewProfile(user._id)}> View profile </button> </h3>
                )
            })}
            </div>
            </>
            } 
        </div>
    )
}
