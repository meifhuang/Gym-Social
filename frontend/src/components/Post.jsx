import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { 
  PostStyle
} from "../styledComponents/Profile";

 import {
  HeartIcon, 
  UnHeartIcon, 
  DeletePostIcon
} from "../assets/icons";

export default function Post({
  loggedInId,
  prevSlidePosition,
  post,
  username,
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

        return (
                <PostStyle>
                <div className="post">
                  <div className="carousel"> 
                      {prevSlidePosition.map(slides => {
                        return (
                          slides.postId === post._id ? <img className="carousel-item carousel-item-visible" src={post.images[slides.index].url} /> : <> </>
                        )
                      })}
                  {post.images.length > 1 ? (
                              <div className="carousel-actions">
                                <button
                                  onClick={() =>
                                    prevSlide(post.images.length, post._id)
                                  }
                                  id={`carousel-button-prev`}
                                  aria-label="Previous"
                                >
                                  {" "}
                                  &lt;{" "}
                                </button>
                               
                                <button
                                  onClick={() =>
                                    nextSlide(post.images.length, post._id)
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
                    <div className="likes"> 
                      { !post.likedBy.includes(loggedInId) ?
                      <HeartIcon likeAPost={likeAPost} postId={post._id}/> : 
                      <UnHeartIcon unlikeAPost={unlikeAPost} postId={post._id}/> }
                    
                      <p> {post.likedBy.length} likes </p>
                      {/* <DeletePostIcon deletePost={deletePost} postId={post._id}/> */}
                    </div>
                    
                    <div className="caption"> 
                      <h4> {username} </h4>
                      <p> {post.caption} </p>
                    </div>
                    <h4> View Comments </h4>
                  {/* <button onClick={() => deletePost(post._id)}> Delete </button> */}
                  </div>
                </div>
                </PostStyle>
              );
                      }
