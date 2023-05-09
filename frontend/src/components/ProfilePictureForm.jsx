import React, { useState } from "react";


function ProfilePictureForm(
    {
    handlePicChange,
    updatePicture
    }) 

    {
    return (
        <>       
        <form onSubmit= {(e) => updatePicture(e)}encType="multipart/form-data"> 
            <input onChange={handlePicChange} type="file" name="image" id="image" accept="image/*" required/>
            <button> update </button>
        </form>
        </>
    )
}

export default ProfilePictureForm;