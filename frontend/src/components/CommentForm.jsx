import React, { useState } from "react";


function CommentForm(
    {
    handleCommentChange, 
    commentForm,
    createComment,
    }) 

    {
    return (
        <>       
        <form onSubmit= {(e) => createComment(e)}> 
            <label htmlFor="comment"> Comment </label>
            <input type="text" name="comment" value={commentForm.description} onChange={handleCommentChange} required/>
            <button> + Add Comment </button>
        </form>
        </>
    )
}

export default CommentForm;