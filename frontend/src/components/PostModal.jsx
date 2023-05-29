import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import CommentForm from "./CommentForm";

import { PostModalStyle, PostDetails } from "../styledComponents/PostModal";

import {
  HeartIcon,
  UnHeartIcon,
  DeletePostIcon,
  DeleteCommentIcon,
} from "../assets/icons";

export default function PostModal({
  loggedInId,
  prevSlidePositionShow,
  posty,
  handleCommentChange,
  commentForm,
  deleteComment,
  createComment,
  nextSlideM,
  prevSlideM,
  deletePost,
  likeAPost,
  unlikeAPost,
}) {
  const dateDiff = (date, type) => {
    const diffHours = Math.floor((new Date() - new Date(date)) / (1000 * 3600))
    if (diffHours <= 1) {
      if (type == 'post') {
        return "less than 1 hour ago"
      }
      else {
        const diffMinutes = Math.floor((new Date() - new Date(date)) / (1000 * 3600))
        return diffMinutes + "m"
      }
    }
    else if (diffHours >= 24) {
      const diffDays = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24))
      if (type == 'post') {
        if (diffDays == 1) {
          return (diffDays + " day ago")
        }
        else {
          return (diffDays + " days ago")
        }
      }
      else {
        return diffDays + "d"
      }
    }
    else {
      if (type == 'post') {
      return (diffHours + " hours ago")
      }
      else {
        return diffHours + "h"
      }
    }
  }



  const [showPost, setShowPost] = useState(true);

  return (
    <>
      {showPost && (
        <PostModalStyle>
          <div className="post">
            <div className="carousel">
              {prevSlidePositionShow.map((slides) => {
                return slides.postId === posty._id ? (
                  <div className="postimg-div">
                      <img
                        className="carousel-item carousel-item-visible"
                        src={posty.images[slides.index].url}
                      />
                    
                    {posty.images.length > 1 ? (
                      <div className="carousel-actions">
                        <button
                          onClick={() =>
                            prevSlideM(posty.images.length, posty._id)
                          }
                          id={`carousel-button-prev`}
                          aria-label="Previous"
                        >
                          
                          &lt;{" "}
                        </button>

                        <button
                          onClick={() =>
                            nextSlideM(posty.images.length, posty._id)
                          }
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
                  </div>
                ) : (
                  <> </>
                );
              })}
            
            </div>
            <PostDetails>
              <div className="caption">
                <img
                  className="userpic-icon"
                  src={posty.createdBy[0].picture[0].url}
                ></img>
                <h4
                  className="user-post"
                  onClick={() => viewProfile(posty.createdBy[0]._id)}
                >
                  {" "}
                  {posty.createdBy[0].fname} {posty.createdBy[0].lname}{" "}
                </h4>
                <h4> {posty.caption} </h4>
                <h5> {dateDiff(posty.createdAt, "post")} </h5>
              </div>
              <div className="postlikes-container">
                <div className="likes">
                  {posty && !posty.likedBy.includes(loggedInId) ? (
                    <HeartIcon likeAPost={likeAPost} postId={posty._id} />
                  ) : (
                    <UnHeartIcon unlikeAPost={unlikeAPost} postId={posty._id} />
                  )}
                  <p> {posty.likedBy.length} likes </p>
                </div>
              </div>

              <div className="comment-container">
                {posty.comments.length > 0 &&
                  posty.comments.map((comment) => {
                    return (
                      <div className="comments">
                        <h5>
                          {" "}
                          {comment.createdBy[0].fname}{" "}
                          {comment.createdBy[0].lname} : {comment.description}{" "}
                        </h5>
                        <p> {dateDiff(comment.createdAt, "comment")} </p>
                        {comment.createdBy[0]._id === loggedInId ? (
                          <div className="delete-comment-icon">
                            <DeleteCommentIcon
                              deleteComment={deleteComment}
                              postId={posty._id}
                              commentId={comment._id}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
              </div>

              <CommentForm
                handleCommentChange={handleCommentChange}
                commentForm={commentForm}
                createComment={createComment}
                postId={posty._id}
              />
            </PostDetails>
          </div>
        </PostModalStyle>
      )}
    </>
  );
}
