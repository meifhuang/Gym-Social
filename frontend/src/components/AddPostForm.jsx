import React, { useState } from "react";
import { PostFormStyle } from "../styledComponents/Profile";
import { redirect } from "react-router-dom";
import { GreyHoverButton } from "../styledComponents/Profile";

import { ArrowLeftIcon, ArrowRightIcon } from "../assets/icons";
function AddPostForm({
  handlePostChange,
  postForm,
  createPost,
  handleFileUpload,
  setFiles,
}) {
  const [previewSource, setPreviewSource] = useState([]);
  const [currentPreviewSource, setCurrentPreviewSource] = useState(0);

  function preview(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource((previewSource) => [...previewSource, reader.result]);
     
    };
  }

  function nextImage() {
    if (currentPreviewSource === previewSource.length - 1) {
      setCurrentPreviewSource(0);
    } else {
      setCurrentPreviewSource(currentPreviewSource + 1);
    }
  }

  function prevImage() {
    if (currentPreviewSource === 0) {
      setCurrentPreviewSource(previewSource.length - 1);
    } else {
      setCurrentPreviewSource(currentPreviewSource - 1);
    }
  }

  console.log(previewSource, currentPreviewSource);
  return (
    <PostFormStyle>
      <form onSubmit={(e) => createPost(e)} encType="multipart/form-data">
        <label htmlFor="image"> Upload Image(s) </label>
        <div className="upload-overlay">
          {previewSource && (
            <img src={previewSource[currentPreviewSource]} alt="" />
          )}
          {previewSource.length > 1 && (
            <div className="upload-arrow-icons">
              <button onClick={prevImage}>
                <ArrowLeftIcon />
              </button>
              <button onClick={nextImage}>
                <ArrowRightIcon />
              </button>
            </div>
          )}
        </div>
        <div className="upload-bar">
          <input
            onChange={(e) => {
              setFiles([...e.target.files]);
  
              Object.keys(e.target.files).map((file) =>
                preview(e.target.files[parseInt(file)])
              );
            }}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
            multiple
          />
        </div>
        <textarea
          type="text"
          name="caption"
          value={postForm.caption}
          onChange={handlePostChange}
          placeholder="Caption"
          //   required
        />

        <GreyHoverButton> Create Post </GreyHoverButton>
      </form>
    </PostFormStyle>
  );
}

export default AddPostForm;
