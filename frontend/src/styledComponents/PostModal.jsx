import styled from "styled-components";

export const PostFormStyle = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostModalStyle = styled.div`
  width: 100%;
  height: 100%;

  .post {
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 100%;
  }
  .postlikes-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1em;
  }
  b {
    font-weight: 600;
  }
  .likes {
    display: flex;
    justify-content: space-between;
    gap: 0.7em;
  }
  .post h4 {
    font-weight: 800;
  }
  .comments {
    display: flex;
    margin-left: 0.5em;
    align-items: center;
    justify-content: space-between;
  }
  .deletePost {
    cursor: pointer;
  }
  .delete-comment-icon {
    display: flex;
    padding: .7em;
    color: black;
    cursor: pointer;
    margin-right: .2em;
  }
  .delete-comment-icon: hover {
    color: red;
  }
  .carousel {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 0, 0);
    min-width: 300px;
  }
  .caption {
    display: flex;
    align-items: center;
    border-bottom: 1.5px solid #f1f1f1;
    margin: 1em;
  }
  .userpic-icon {
    width: 40px;
    height: 40px; 
    border-radius: 50%; 
    margin-bottom: .5em;
  }
  .user-post:hover {
    color: #d0e1e4;
    cursor: pointer;
  }

  .carousel .carousel-item,
  .carousel .carousel-item-hidden {
    display: none;
  }

  .carousel .carousel-item-visible {
    display: block;
    animation: fade 1.5s;
  }

  .carousel .carousel-actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
  }
  .carousel .carousel-actions button {
    border-radius: 50px;
    background-color: transparent;
    border: 0;
    font-size: 20px;
    color: white;
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
  .comment-form {
    height: 9%;
    display: flex;
    flex-direction: row;
    margin-top: auto;
    border: 1px solid black;
    margin-left: 1em;
    margin-right: 1em;
    margin-bottom: 1em;
    border-radius: 10px;
    border: 1px solid grey;
  }
  #description {
    width: 90%;
    height: 100%;
    border: none;
  }
  #description:focus {
    outline: #f1f1f1;
  }

  .comment-button-container {
    height: 100%;
    border-left: 1px solid #f1f1f1;
    width: 16%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .comment-button {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .comment-button: hover {
    background-color: #f2f2f2;
  }
  .closepost {
    padding: 1em;
    margin-left: 40%;
  }
  h3,
  h4,
  h5 {
    margin: 0.5em;
  }
  img {
    position: relative;
    width: 100%;
    height: auto;
    flex-shrink: 1;
  }
  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media only screen and (min-width: 800px) {
    .post {
      flex-direction: row;
    }

    .carousel {
      /* margin: 0 auto; */
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(0, 0, 0);
      min-width: 300px;
    }
  }
`;

export const PostStyle = styled.div`
  .post {
    border: 1px solid black;
    margin: 1em;
  }
  .post-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.6em;
  }
  b {
    font-weight: 600;
  }
  .likes {
    display: flex;
    justify-content: space-between;
    gap: 0.7em;
   
  }
  .post h4 {
    font-weight: 800;
  }
  .comments {
    display: flex;
    margin: 0.5em;
    justify-content: space-between;
  }
  .deletePost {
    // margin-left: 14em;
    cursor: pointer;
  }
  .carousel {
    position: relative;
    margin: 0 auto;
    /* width: 100%; */
  }
  .caption {
    display: flex;
    align-items: center;
  }
  .user-post:hover {
    color: #d0e1e4;
    cursor: pointer;
  }
  .comment-button {
    padding: 5px;
    border-radius: 10px;
  }
  .closepost {
    padding: 1em;
    margin-left: 40%;
  }
  .carousel .carousel-item,
  .carousel .carousel-item-hidden {
    display: none;
  }

  .carousel .carousel-item-visible {
    display: block;
    animation: fade 1.5s;
  }

  .carousel .carousel-actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
  }
  .carousel .carousel-actions button {
    border-radius: 50px;
    background-color: transparent;
    border: 0;
    font-size: 20px;
    color: white;
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
  h3,
  h4,
  h5 {
    margin: 0.5em;
  }
  img {
    width: 350px;
    height: 300px;
    border: 1px solid black;
  }
  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @media only screen and (min-width: 800px) {
    .post {
      flex-direction: row;
    }
  }
`;
export const PostDetails = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & .comment-container {
    overflow: auto;
    height: 400px;
  }

  @media only screen and (min-width: 800px) {
    width: 60%;
    & .comment-container {
      overflow: auto;
      height: 400px;
    }
  }
`;

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 1000;
  background-color: #f1f1f1;
  /* border: 1px solid red; */

  .cross-icon {
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
  }

  .cross-icon svg {
    color: #f1f1f1;
  }

  & .modal-content,
  &.workout-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 2.4;
    background: #f1f1f1;
    width: 80%;

    height: 90%;
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .stats {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .select-exercise {
    font-size: 1.2em;
    font-weight: 800;
    /* border: 1px solid red; */
  }
  input {
    width: 3.1em;
    height: 2.1em;
    margin: 0.5em;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  form > * {
    // margin-bottom: 0.5em;
  }

  .inputted-exercises {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* align-items: center; */
  }

  /* .inputted-exercises:nth-child(1) {
    flex: 1;
  } */
  /* 
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    
  } */
  /* & img {
 
    width: 200px;
  } */
  @media only screen and (min-width: 1200px) {
    & .modal-content,
    &.workout-modal {
      min-width: 1200px;
    }
  }
`;
