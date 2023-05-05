import React, { useState } from "react";


function AddPostForm(
    {
    handlePostChange, 
    postForm,
    createPost,
    handleFileUpload
    }) 

    {
    return (
        <>       
        <form onSubmit= {(e) => createPost(e)} enctype="multipart/form-data"> 
            <label htmlFor="caption"> Caption </label>
            <input type="text" name="caption" value={postForm.caption} onChange={handlePostChange} required/>
            <label for="image"> Upload Image(s) </label>
            <input onChange={handleFileUpload} type="file" name="image" id="image"  accept="image/*"/>
            <button> Add post </button>
        </form>
        </>
    )
}

export default AddPostForm;