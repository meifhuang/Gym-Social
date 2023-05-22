import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import CommentForm from "./CommentForm";
import PostModal from "./PostModal"; 

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
  post,
  prevSlidePosition,
  handleCommentChange,
  commentForm,
  deleteComment,
  createComment,
  nextSlide,
  prevSlide,
  deletePost,
  likeAPost,
  unlikeAPost
}) {

    const [prevSlidePositionShow, setPrevSlidePositionShow] = useState({});
    const [showPost, setShowPost] = useState(false); 
    const [postToShow, setPostToShow] = useState([]);


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
        console.log('double checking', response.data.post); 
        setPostToShow(response.data.post); 
        // setPostToShow(response.data.post);
        const postIdAndPosition = [{postId: response.data.post[0]._id, index: 0}];
        setPrevSlidePositionShow(postIdAndPosition);
      }
    }
    catch (e) {
      console.log(e.message);
    }
  }

const toggleComment = async (postId) => {
    getPost(postId);
    setShowPost(true);
}

        return (
            <> 
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
                        <div className="post-options"> 
                            <div className="likes">
                                { !post.likedBy.includes(loggedInId) ?
                                <HeartIcon likeAPost={likeAPost} postId={post._id}/> : 
                                <UnHeartIcon unlikeAPost={unlikeAPost} postId={post._id}/> }
                                <p> {post.likedBy.length} likes </p>
                            </div>
                                { post.createdBy[0]._id === loggedInId ? <DeletePostIcon deletePost={deletePost} postId={post._id}/> : <></>}
                        </div>
                        <div className="caption"> 
                            <h4> {post.createdBy[0].fname} {post.createdBy[0].lname } </h4>
                            <p> {post.caption} </p>
                        </div>
                        <h4 onClick={() => toggleComment(post._id)}> View Comments </h4> 
                        {/* { 
                            showComment ? 
                            <> 
                        { post.comments && post.comments.map((comment) => { 
                      return (
                        <div className="comments"> 
                         <h5> {comment.username} : {comment.description} </h5>
                         <button onClick={() => deleteComment(post._id, comment._id)}> delete </button>
                        </div> 
                      )
                    })}
                    <CommentForm 
                      handleCommentChange={handleCommentChange}
                      commentForm={commentForm}
                      createComment={createComment}
                      postId={post._id}
                    /> 
                    </> :
                    } */}
                    </div>
                </div>

                {/* {showPost && postToShow.map((post) => { return (<h5> {post.comments[0].username} </h5>)})} */}
                </PostStyle>
                   
                { showPost ? postToShow.map((posty) => {return (
                    <PostModal
                        deletePost={deletePost}
                        unlikeAPost={unlikeAPost}
                        likeAPost={likeAPost}
                        key={post._id}

                        nextSlide={nextSlide}
                        prevSlide={prevSlide}
                        prevSlidePositionShow={prevSlidePositionShow}
                        posty={posty}
                        loggedInId={loggedInId}
                        commentForm={commentForm}
                        handleCommentChange={handleCommentChange}
                        createComment={createComment}
                        deleteComment={deleteComment}
                /> )})
                : <></> }
            </>
        )
    }