import React, { useState } from "react";


function CommentForm(
    {
    handleCommentChange, 
    commentForm,
    createComment,
    postId,
    }) 

    {
    return (
        <>       
        <form onSubmit= {(e) => createComment(e,postId)}> 
            {/* <label className="comment-label" htmlFor="description"> Comment </label> */}
            <input type="text" id="description" class="description" value={commentForm.description} onChange={handleCommentChange} required/>
            <button className="comment-button"> + Comment </button>
        </form>
        </>
    )
}

export default CommentForm;