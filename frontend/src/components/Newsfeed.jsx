import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Post from "./Post";

import { NewsFeed } from "../styledComponents/Profile";

export default function Newsfeed({
  //props for POSTS
  handlePostChange,
  postForm,
  handleFileUpload,
  deletePost,
}) {
  const BASE_URL = import.meta.env.VITE_URL;
  const FRONTEND_URL = import.meta.env.FRONTEND_URL;
  console.log(FRONTEND_URL)
  const navigate = useNavigate();
  const [loggedInId, setLoggedInId] = useState(localStorage.getItem("id"));
  const [prevSlidePosition, setPrevSlidePosition] = useState({});
  const [posts, setPosts] = useState([]);

  const likeAPost = async (postId) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/likepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response.data);
        getPosts();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const unlikeAPost = async (postId) => {
    console.log("UNLIKEE");
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL}/unlikepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response.data);
        getPosts();
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
        console.log("checking", response.data.posts);
        setPosts(response.data.posts);
        const postIdAndPosition = response.data.posts.map((post) => {
          return { postId: post._id, index: 0 };
        });
        console.log("postId", postIdAndPosition);
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
    console.log("next", prevSlidePosition);
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
    console.log("prev", prevSlidePosition);
  };

  const redirectNewsfeed = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/auth/google/callback", 
      })
      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.userId);
      }
    }
    catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    redirectNewsfeed();
  }, [])
  // useEffect(() => {
  //   // const urlParams = new URLSearchParams(window.location.search);
  //   // const token = urlParams.get("token");
  //   // const userId = urlParams.get("userId");
  //   if (token && userId) {
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("id", userId);
  //     window.location.replace(`${FRONTEND_URL}/newsfeed`);
  //   }
  //   getPosts();
  // }, []);

  const viewProfile = async (userId) => {
    navigate(`/profile/${userId}`);
  };

  const exploreUsers = async () => {
    navigate("/explore");
  };

  return (
    <NewsFeed>
      {/* <button onClick={getPosts}> getPosts </button> */}

      {posts &&
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
            />
          );
        })}
    </NewsFeed>
  );
}
