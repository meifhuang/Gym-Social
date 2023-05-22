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
            <label htmlFor="description"> Comment </label>
            <input type="text" name="description" value={commentForm.description} onChange={handleCommentChange} required/>
            <button> + Add Comment </button>
        </form>
        </>
    )
}

export default CommentForm;