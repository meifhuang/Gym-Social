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
        <form onSubmit= {(e) => createPost(e)} encType="multipart/form-data"> 
            <label htmlFor="caption"> Caption </label>
            <input type="text" name="caption" value={postForm.caption} onChange={handlePostChange} required/>
            <label htmlFor="image"> Upload Image(s) </label>
            <input onChange={handleFileUpload} type="file" name="image" id="image"  accept="image/*" multiple/>
            <button> Add post </button>
        </form>
        </>
    )
}

export default AddPostForm;