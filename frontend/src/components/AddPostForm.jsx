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
        <form onSubmit= {(e) => createPost(e)} enctype="multipart/form-data"> 
            <label htmlFor="caption"> Caption </label>
            <input type="text" name="caption" value={postForm.caption} onChange={handlePostChange} required/>
            <button> Add post </button>
            <input type="file" name="image"/>
        </form>
        </>
    )
}

export default AddPostForm;