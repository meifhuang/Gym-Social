import React, { useState } from "react";

import { ProPicInfoForm, GreyHoverButton } from "../styledComponents/Profile";

function EditProfileForm({
  handlePicChange,
  updatePicture,
  handleProfileInfoChange,
  profileInfo,
  errorMessage,
  setProPic,
  userPicUrl,
}) {
  console.log(userPicUrl);
  const [previewSource, setPreviewSource] = useState(userPicUrl);

  function preview(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  return (
    <ProPicInfoForm>
      <div className="profileinfo-title">
        <h1> Edit Profile </h1>
      </div>
      {previewSource && <img src={previewSource} alt="" />}
      <form onSubmit={(e) => updatePicture(e)} encType="multipart/form-data">
        <div className="profile-inputs">
          <label htmlFor="username"> Update username</label>
          <input
            onChange={handleProfileInfoChange}
            type="text"
            name="username"
            value={profileInfo.username}
          />
          <h5> {errorMessage} </h5>
        </div>
        <div className="profile-inputs">
          <label htmlFor="bio"> Update bio </label>
          <textarea
            onChange={handleProfileInfoChange}
            name="bio"
            value={profileInfo.bio}
          />
        </div>
        <div className="profile-inputs">
          <label htmlFor="image"> Update profile picture </label>
          <input
            onChange={(e) => {
              setProPic([...e.target.files]);
              preview(e.target.files[0]);
            }}
            type="file"
            name="image"
            id="image"
            accept="image/*"
          />
        </div>
        <GreyHoverButton> Confirm </GreyHoverButton>
      </form>
    </ProPicInfoForm>
  );
}

export default EditProfileForm;
