import React, { useState } from "react";

import {ProPicInfoForm} from "../styledComponents/Profile";

function EditProfileForm(
    {
    handlePicChange,
    updatePicture,
    handleProfileInfoChange,
    profileInfo
    }) 

    {
    return (
        <ProPicInfoForm>
        <div className="profileinfo-title">            
            <h1> Edit Profile </h1>
        </div>
        <form onSubmit= {(e) => updatePicture(e)}encType="multipart/form-data"> 
        <div className="profile-inputs"> 
                <label htmlFor="username"> Update username</label>
                <input onChange={handleProfileInfoChange} type="text" name="username" value={profileInfo.username}/>
            </div>
            <div className="profile-inputs"> 
                <label htmlFor="bio"> Update bio </label>
                <textarea onChange={handleProfileInfoChange} name="bio" value={profileInfo.bio} />
            </div>
            <div className="profile-inputs"> 
                <label htmlFor="image"> Update profile picture </label>
                <input onChange={handlePicChange} type="file" name="image" id="image" accept="image/*"/>
            </div> 
            <button> Confirm </button>
        </form>
        </ProPicInfoForm>
    )
}

export default EditProfileForm;