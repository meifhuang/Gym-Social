import React, { useState } from "react";


function AddPostForm(
    {
    handlePostChange, 
    postForm,
    createPost,
    }) 

    {
    return (
        <>       
        <form onSubmit= {(e) => createPost(e)}> 
            <label htmlFor="caption"> Caption </label>
            <input type="text" name="caption" value={postForm.caption} onChange={handlePostChange} required/>
            <button> Add post </button>
        </form>
        </>
    )
}

export default AddPostForm;