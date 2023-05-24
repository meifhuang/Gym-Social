import React, { useState } from "react";

import {ProPicInfoForm} from "../styledComponents/Profile";

function ProfilePictureForm(
    {
    handlePicChange,
    updatePicture
    }) 

    {
    return (
        <ProPicInfoForm>
        <div>            
        <h1> Change Profile Photo </h1>
        </div>
        <form onSubmit= {(e) => updatePicture(e)}encType="multipart/form-data"> 
            <input onChange={handlePicChange} type="file" name="image" id="image" accept="image/*" required/>
            <button> Update Image </button>
        </form>
        </ProPicInfoForm>
    )
}

export default ProfilePictureForm;