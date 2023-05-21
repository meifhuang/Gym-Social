import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios"; 
import { AuthContext } from "../AuthContext";
import Post from "./Post";

import {
  NewsFeed
} from "../styledComponents/Profile";

 import {
  HeartIcon, 
  UnHeartIcon, 
  DeletePostIcon
} from "../assets/icons";

export default function Newsfeed({
  loggedInId,
  //props for POSTS
  handlePostChange,
  postForm,
  handleCommentChange,
  commentForm,
  deleteComment,
  createComment,
  postLikes,
  createPost,
  comments,
  handleFileUpload,
  user,
  nextSlide,
  prevSlide,
  deletePost,
  likeAPost,
  unlikeAPost
}) {

    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('id'));
    const [username, setUsername] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [following, setFollowing] = useState([]);
    const [notFollowing, setnotFollowing] = useState([]);

    const [prevSlidePosition, setPrevSlidePosition] = useState({})
    const [posts, setPosts] = useState([]); 

    const getPosts = async () => {
      console.log('supposedToGet')
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:4000/posts",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response) {
          setPosts(response.data.posts);
          const postIdAndPosition = response.data.posts.map(post => {return ({postId:post._id, index: 0})});
          setPrevSlidePosition(postIdAndPosition);
        }
      }
      catch (e) {
        console.log(e.message);
      }
    }
  
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
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');
    if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('id', userId);
      window.location.replace('http://localhost:5173/newsfeed');
    }
    getPosts(); 
  }, []);
  

  // useEffect(() => {
  //   getUsers();
  // },[]);



const viewProfile = async (userId) => {
    navigate(`/profile/${userId}`);
}

const exploreUsers = async () => {
  navigate('/explore')
}

    return (
        <div>
       
            {/* { following.length > 0 ? following.map((follower) => {
                  return (
                    <div className="users">
                    <h2> {follower.fname} {follower.lname} {follower.workouts} <button onClick={() => viewProfile(follower._id)}> View profile </button> </h2>
                  </div> 
                    )
                  })
                 :
                <h2> Nothing on newsfeed. Go follow and explore! </h2>
          
                } */}
              <NewsFeed> 
              <h1> HOME </h1>
            {/* <button onClick={getPosts}> getPosts </button> */}
            <button onClick={() => viewProfile(loggedInUser)}> Go to my profile </button>
                { posts && posts.map((post) => {
              return (
               <Post 
                  post={post}
                  nextSlide={nextSlide}
                  prevSlide={prevSlide}
                  prevSlidePosition={prevSlidePosition}
                  username={username}
               />
              )
              })
            }
            </NewsFeed>
          </div> 
    )
}
