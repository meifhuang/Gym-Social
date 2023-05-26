import React, { useState } from "react";

function CommentForm({
  handleCommentChange,
  commentForm,
  createComment,
  postId,
}) {
  return (
    // <div>
      <form className="comment-form" onSubmit={(e) => createComment(e, postId)}>
        {/* <label className="comment-label" htmlFor="description"> Comment </label> */}
        <input
          type="text"
          id="description"
          class="description"
          placeholder="Add a comment..."
          value={commentForm.description}
          onChange={handleCommentChange}
          required
        />
        <div className="comment-button-container">
          <button className="comment-button"> Post </button>
        </div>
      </form>
    // </div>
  );
}

export default CommentForm;
