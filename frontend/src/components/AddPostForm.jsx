import React, { useState } from "react";
import { PostFormStyle } from "../styledComponents/Profile";


function AddPostForm(
    {
    handlePostChange, 
    postForm,
    createPost,
    handleFileUpload
    }) 

    {
    return (
        <PostFormStyle>       
        <form onSubmit= {(e) => createPost(e)} encType="multipart/form-data"> 
            <label htmlFor="caption"> Caption </label>
            <input type="text" name="caption" value={postForm.caption} onChange={handlePostChange} required/>
            <label htmlFor="image"> Upload Image(s) </label>
            <input onChange={handleFileUpload} type="file" name="image" id="image"  accept="image/*" required multiple/>
            <button> Add post </button>
        </form>
        </PostFormStyle>
    )
}

export default AddPostForm;