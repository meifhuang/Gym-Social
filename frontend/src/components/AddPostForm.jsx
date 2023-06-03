import React, { useState } from "react";
import { PostFormStyle } from "../styledComponents/Profile";
import { redirect } from "react-router-dom";

import { ArrowLeftIcon, ArrowRightIcon } from "../assets/icons";
function AddPostForm({
  handlePostChange,
  postForm,
  createPost,
    handleFileUpload,
  setFiles
}) {
  const [previewSource, setPreviewSource] = useState([]);
  const [currentPreviewSource, setCurrentPreviewSource] = useState(0);
  //   console.log(preview(previewFiles[0]));
  function preview(file) {
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   console.log(reader.result);
    //   return reader.result;
    // };
    reader.onloadend = () => {
      setPreviewSource((previewSource) => [...previewSource, reader.result]);
      console.log(previewSource);
    };
  }
  // console.log(preview )
  console.log(previewSource);
  return (
    <PostFormStyle>
      <form onSubmit={(e) => createPost(e)} encType="multipart/form-data">
        <label htmlFor="image"> Upload Image(s) </label>
        <div className="upload-overlay">
          {/* {previewSource &&
            previewSource.map((file) => {
              return <img src={file} alt="" />;
            })} */}
          {previewSource && (
            <img src={previewSource[currentPreviewSource]} alt="" />
          )}
          <div className="upload-arrow-icons">
            <ArrowLeftIcon
              onClick={() => setCurrentPreviewSource(currentPreviewSource - 1)}
            />

            <ArrowRightIcon
              onClick={() => setCurrentPreviewSource(currentPreviewSource + 1)}
            />
          </div>
          <input
            // onChange={(e) => preview(e.target.files[0])}
            onChange={(e) => {
              setFiles([...e.target.files])
              console.log(Object.keys(e.target.files));
              Object.keys(e.target.files).map((file) =>
                preview(e.target.files[parseInt(file)])
              );
            }}
            // onChange={handleFileUpload}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
            multiple
          />
          {/* 
          <label
            htmlFor="filePicker"
          >
            Upload Images
          </label>
          <input
            id="filePicker"
            style={{ visibility: "hidden" }}
            type={"file"}
          ></input> */}
        </div>
        {/* <label htmlFor="caption"> Caption </label> */}
        <textarea
          type="text"
          name="caption"
          value={postForm.caption}
                  onChange={handlePostChange}
                  placeholder="Caption"
          required
        />

        <button> Add post </button>
      </form>
    </PostFormStyle>
  );
}

export default AddPostForm;
