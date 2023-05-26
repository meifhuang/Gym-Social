import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import CommentForm from "./CommentForm";
import PostModal from "./PostModal";

import { Modal} from "../styledComponents/PostModal"
import { ModalOverlay } from "../styledComponents/Profile";
import { PostStyle } from "../styledComponents/PostModal";

import { HeartIcon, UnHeartIcon, DeletePostIcon, CrossIcon } from "../assets/icons";

export default function Post({
  post,
  getPosts,
  userPicUrl,
  prevSlidePosition,
  prevSlide,
  nextSlide,
  loggedInId,
  deletePost,
  viewProfile,
}) 
{
  const [prevSlidePositionShow, setPrevSlidePositionShow] = useState({});
  const [showPost, setShowPost] = useState(false);
  const [postToShow, setPostToShow] = useState([]);
  const [commentForm, setCommentForm] = useState({ description: "" });
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState(""); 

  useEffect(()=> {
    setUrl(window.location.href);
  },[])


  const toggleModal = async (postId) => {
      setModal(!modal)
      getPost(postId);
  }
 
  const getPost = async (postId) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/getpost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log("double checking", response.data.post);
        setPostToShow(response.data.post);
        // setPostToShow(response.data.post);
        const postIdAndPosition = [
          { postId: response.data.post[0]._id, index: 0 },
        ];
        setPrevSlidePositionShow(postIdAndPosition);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const likeAPost = async (postId) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:4000/likepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response.data);
        getPosts();
        getPost(postId);
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
        url: `http://localhost:4000/unlikepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response.data);
        getPosts();
        getPost(postId);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const nextSlideM = (imglength, postId) => {
    setPrevSlidePositionShow((prevSlides) => {
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

  const prevSlideM = (imglength, postId) => {
    setPrevSlidePositionShow((prevSlides) => {
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

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm({
      description: value,
    });
    console.log(commentForm);
  };

  const createComment = async (e, postId) => {
    e.preventDefault();
    console.log("INSIDE COMMENT");
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:4000/post/${postId}/createcomment`,
        data: {
          description: commentForm.description,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        //gotta figure out better way
        getPost(postId);
      } else {
        console.log("no response");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:4000/post/${postId}/comment/${commentId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        getPost(postId);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <PostStyle>
        <div className="post">
          <div className="post-title"> 
        <img className="userpic-icon" src={post.createdBy[0].picture[0].url}></img>
        <h4> {" "}
                {post.createdBy[0].fname} {post.createdBy[0].lname}{" "} </h4>
          </div>
          <div className="carousel">
            {prevSlidePosition.map((slides) => {
              return slides.postId === post._id ? (
                <img
                  onClick={()=>toggleModal(post._id)}
                  className="carousel-item carousel-item-visible"
                  src={post.images[slides.index].url}
                />
              ) : (
                <> </>
              );
            })}
            {post.images.length > 1 ? (
              <div className="carousel-actions">
                <button
                  onClick={() => prevSlide(post.images.length, post._id)}
                  id={`carousel-button-prev`}
                  aria-label="Previous"
                >
                  {" "}
                  &lt;{" "}
                </button>

                <button
                  onClick={() => nextSlide(post.images.length, post._id)}
                  id={`carousel-button-next`}
                  aria-label="Next"
                >
                  {" "}
                  &gt;{" "}
                </button>
              </div>
            ) : (
              <div> </div>
            )}
            { url.includes('newsfeed') && 
            <> 
            <div className="post-options">
              <div className="likes">
                {!post.likedBy.includes(loggedInId) ? (
                  <HeartIcon likeAPost={likeAPost} postId={post._id} />
                ) : (
                  <UnHeartIcon unlikeAPost={unlikeAPost} postId={post._id} />
                )}
                <p> {post.likedBy.length} likes </p>
              </div>
              {post.createdBy[0]._id === loggedInId ? (
                <DeletePostIcon deletePost={deletePost} postId={post._id} />
              ) : (
                <></>
              )}
            </div>
            <div className="caption">
              <h4
                className="user-post"
                onClick={() => viewProfile(post.createdBy[0]._id)}
              >
                {" "}
                {post.createdBy[0].fname} {post.createdBy[0].lname}{" "}
              </h4>
              <p> {post.caption} </p>
            </div>
            <h4 onClick={() => toggleModal(post._id)}> View Comments </h4>
            </>
              }
        </div> 
        </div>
      </PostStyle>

      {modal ? (
        postToShow.map((posty) => {
          return (
            <Modal className="">
              <ModalOverlay
                onClick={() => setModal(!modal)}
                className=""
              ></ModalOverlay>
              <div className="modal-content">
                <div onClick={()=> setModal(!modal)} className="cross-icon"><CrossIcon /></div>
                <PostModal
                  loggedInId={loggedInId}
                  deletePost={deletePost}
                  unlikeAPost={unlikeAPost}
                  likeAPost={likeAPost}
                  key={post._id}
                  nextSlideM={nextSlideM}
                  prevSlideM={prevSlideM}
                  prevSlidePositionShow={prevSlidePositionShow}
                  posty={posty}
                  commentForm={commentForm}
                  handleCommentChange={handleCommentChange}
                  createComment={createComment}
                  deleteComment={deleteComment}
                  viewProfile={viewProfile}
                  userPicUrl={userPicUrl}
                />
              </div>
            </Modal>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}