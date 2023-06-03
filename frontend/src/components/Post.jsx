import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import CommentForm from "./CommentForm";
import PostModal from "./PostModal";

import { ModalOverlay } from "../styledComponents/Profile";
import {
  PostImageContainer,
  PostLikesComments,
  PostStyle,
  Modal,
} from "../styledComponents/PostModal";

import {
  HeartIcon,
  UnHeartIcon,
  DeletePostIcon,
  CrossIcon,
  CommentIcon,
} from "../assets/icons";

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
  page,
}) {
  // console.log(page)
  const BASE_URL = import.meta.env.VITE_URL;
  const [prevSlidePositionShow, setPrevSlidePositionShow] = useState({});
  const [showPost, setShowPost] = useState(false);
  const [postToShow, setPostToShow] = useState([]);
  const [commentForm, setCommentForm] = useState({ description: "" });
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState("");
  const [currentdate, setCurrentDate] = useState([]);
  const [showLikesComments, setShowLikesComments] = useState(false);
  useEffect(() => {
    setUrl(window.location.href);
    setCurrentDate(new Date());
  }, []);

  const toggleModal = async (postId) => {
    setModal(!modal);
    getPost(postId);
  };

  const getPost = async (postId) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}/getpost/${postId}`,
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
        url: `${BASE_URL}/likepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response.data);
        // getPosts();
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
        url: `${BASE_URL}/unlikepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response.data);
        // getPosts();
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
        url: `${BASE_URL}/post/${postId}/createcomment`,
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
        url: `${BASE_URL}/post/${postId}/comment/${commentId}`,
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

  const dateDiff = (date) => {
    const diffHours = Math.floor((new Date() - new Date(date)) / (1000 * 3600));

    if (diffHours <= 1) {
      return "less than 1 hour ago";
    } else if (diffHours >= 24) {
      const diffDays = Math.floor(
        (new Date() - new Date(date)) / (1000 * 3600 * 24)
      );
      if (diffDays == 1) {
        return diffDays + " day ago";
      } else {
        return diffDays + " days ago";
      }
    } else {
      return diffHours + " hours ago";
    }
  };

  return (
    <>
      <PostStyle>
        <div className={"post " + page}>
          {url.includes("newsfeed") ? (
            <div className="post-title">
              <img
                className="userpic-icon"
                src={post.createdBy[0].picture[0].url}
              ></img>
              <h4>
                {" "}
                {post.createdBy[0].fname} {post.createdBy[0].lname}{" "}
              </h4>
            </div>
          ) : (
            <> </>
          )}
          <div className="carousel">
            {prevSlidePosition.map((slides) => {
              return slides.postId === post._id ? (
                <PostImageContainer
                  onClick={() => toggleModal(post._id)}
                  showLikesComments={showLikesComments}
                  onMouseEnter={
                    page === "profile" ? () => setShowLikesComments(true) : ""
                  }
                  onMouseLeave={
                    page === "profile" ? () => setShowLikesComments(false) : ""
                  }
                >
                  <div
                    className={"post-img-div " + page}
                    // onClick={() => toggleModal(post._id)}
                  >
                    <img
                      className="carousel-item carousel-item-visible"
                      src={post.images[slides.index].url}
                    />
                  </div>
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
                  {showLikesComments && (
                    <PostLikesComments>
                      <div>
                        <HeartIcon />
                        <span>{post.likedBy.length}</span>
                      </div>
                      <div>
                        <CommentIcon />
                        <span>{post.comments.length}</span>
                      </div>
                    </PostLikesComments>
                  )}
                </PostImageContainer>
              ) : (
                <> </>
              );
            })}
            {/* {post.images.length > 1 ? (
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
            )} */}
            {url.includes("newsfeed") && (
              <>
                <div className="post-options">
                  <div className="likes">
                    {!post.likedBy.includes(loggedInId) ? (
                      <HeartIcon likeAPost={likeAPost} postId={post._id} />
                    ) : (
                      <UnHeartIcon
                        unlikeAPost={unlikeAPost}
                        postId={post._id}
                      />
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
                {/* <h4 onClick={() => toggleModal(post._id)}> View Comments </h4> */}
                {<h5> {dateDiff(post.createdAt)} </h5>}
              </>
            )}
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
                <div onClick={() => setModal(!modal)} className="cross-icon">
                  <CrossIcon />
                </div>
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
