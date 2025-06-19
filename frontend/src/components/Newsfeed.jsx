import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Post from "./Post";

import { NewsFeed } from "../styledComponents/Profile";
import {
  ExploreContainer,
  UserCard,
  UserCardContainer,
} from "../styledComponents/Explore";

export default function Newsfeed({
  //props for POSTS
  handlePostChange,
  postForm,
  handleFileUpload,
  deletePost,
}) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const FRONT_URL = import.meta.env.FRONTEND_URL;
  const navigate = useNavigate();
  const [loggedInId, setLoggedInId] = useState(localStorage.getItem("id"));
  const [prevSlidePosition, setPrevSlidePosition] = useState({});
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([])


  const getFollowing = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/explore`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        const following = res.data.users.filter(
          (x) => res.data.following.find((y) => y._id === x._id)
        );
        setFollowing(following);
      } else {
        console.log("no responses");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getFollowing();
  }, []);


  const likeAPostN = async (postId) => {
   
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/likepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        getPosts();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const unlikeAPostN = async (postId) => {
    
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL}/unlikepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
       getPosts()
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}/newsfeed/posts`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
      
        setPosts(response.data.posts);
        const postIdAndPosition = response.data.posts.map((post) => {
          return { postId: post._id, index: 0 };
        });
    
        setPrevSlidePosition(postIdAndPosition);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const nextSlide = (imglength, postId) => {
    setPrevSlidePosition((prevSlides) => {
      return prevSlides.map((slide) => {
        if (slide.postId === postId) {
          if (slide.index === imglength - 1) {
            return { ...slide, index: 0 };
          } else {
            return { ...slide, index: slide.index + 1 };
          }
        } else {
          return slide;
        }
      });
    });
    
  };

  const prevSlide = (imglength, postId) => {
    setPrevSlidePosition((prevSlides) => {
      return prevSlides.map((slide) => {
        if (slide.postId === postId) {
          if (slide.index === 0) {
            return { ...slide, index: imglength - 1 };
          } else {
            return { ...slide, index: slide.index - 1 };
          }
        } else {
          return slide;
        }
      });
    });
   
  };

  useEffect(() => {
      getPosts();
  }, []);


  // ???? <link to={`/profile/localstorage` ??? }

  const viewProfile = async (userId) => {
    navigate(`/profile/${userId}`);

  };

  const exploreUsers = async () => {
    navigate("/explore");
  };

  return (
    <NewsFeed>
      {/* <button onClick={getPosts}> getPosts </button> */}
     
      {posts.length ?
        posts.map((post) => {
          return (
            <Post
              deletePost={deletePost}
              handleFileUpload={handleFileUpload}
              key={post._id}
              post={post}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              prevSlidePosition={prevSlidePosition}
              loggedInId={loggedInId}
              viewProfile={viewProfile}
              getPosts={getPosts}
              page="newsfeed"
              likeAPostN={likeAPostN}
              unlikeAPostN={unlikeAPostN}
            />
          );
        })
      :
     following.length > 0 ?
      <ExploreContainer>
      <h1> Following </h1>
      <UserCardContainer>
        {following &&
          following.map((fol) => {
            return (
              <UserCard className="users">
                <img src={fol.picture[0].url} alt="" />
                <h3>
                  {" "}
                  {fol.fname} {fol.lname}{" "}
                </h3>
                <div className="usercard-bio">
                  {fol.bio}
                </div>
                <button onClick={() => viewProfile(fol._id)}>
                  {" "}
                  View Profile{" "}
                </button>{" "}
              </UserCard>
            );
          })}
      </UserCardContainer>
    </ExploreContainer>
        :
        <div className="no-following">
            <h3> You are currently not following anyone. </h3>
            <h3> Head over to the explore page to discover more people! </h3>
        </div>
      } 
  
    </NewsFeed>
  );
}
