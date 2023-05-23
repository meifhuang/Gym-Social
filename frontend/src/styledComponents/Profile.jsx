import styled from "styled-components";

export const CenteredFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CenteredFlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileMain = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0rem calc(1rem + 5vw);
  gap: 2rem;
`

export const ProfileComp = styled.main`
  /* background-color: lightblue; */
  display: flex;
  letter-spacing: 1px;
  padding: 2rem;
  margin: 2rem calc(1rem + 5vw);
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  & .tag {
    grid-area: tag;
    grid-column: 1/9;
    grid-row: 1/2;
  }

  & .workouts {
    grid-area: workouts;
    grid-column: 1/9;
    grid-row: 2/4;
  }

  @media all and (max-width: ${(props) => props.theme.breakpoint.md}) {
    margin: 0;
  }
`;

export const TagInfo = styled.div`
  display: flex;
  /* margin: 2rem; */
  border: 2px solid rgb(163, 158, 158); 
  border-radius: 0.25rem;
  padding: 3rem;
  gap: 3rem;
  img {
    width: 200px;
  }
  button,
  input {
    width: 12em;
    height: 2.5em;
    margin-top: 1em;
  }
  .create-workout {
    justify-content: center;
    align-items: center;
    align-self: center;
  }

  @media all and (max-width: ${(props) => props.theme.breakpoint.md}) {
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }
`;

export const UserInformation = styled(CenteredFlexColumn)`
  align-items: start;
  gap: 1rem;
  padding: 2rem;

  @media all and (max-width: ${(props) => props.theme.breakpoint.md}) {
    align-items: center;
  }
`;

export const ImageContainer = styled(CenteredFlexColumn)`
  gap: 1rem;
  .profilepic {
    cursor: pointer;
  }
`;

export const UserContact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`;

export const UserStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const About = styled(CenteredFlexColumn)`
  line-height: 1.25rem;
`;

export const FollowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  width: 100px;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  border: none;
  background: #e0e5e7;
  /* background: ${({ followed }) =>
    followed === "true" ? "#e0e5e7" : "#9BA4B5"}; */
  transition: 0.15s ease-in-out;

  &:hover {
    /* background: ${({ followed }) =>
      followed === "true" ? "#9BA4B5" : "#e0e5e7"}; */
    background: #9ba4b5;
  }
`;

// export const UnfollowButton = styled(FollowButton)`
// `


export const PostContainer = styled.div`
  min-width: 1200px;
  min-height: 400px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: end;
  align-items: end;
  gap: 2em;
  margin-top: 1em;

`

export const NewsFeed = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;

 
  
`

export const PostFormStyle = styled.div`
    display: flex;
    justify-content: center;
`



export const PostModalStyle = styled.div`

.post {
  display: flex;
  border: 1px solid red;
  background-color: white;
}

.post-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .6em;
}

b {
  font-weight: 600;
}
.likes {
  display: flex;
  justify-content: space-between;
  gap: .7em;
}
.post h4 {
  font-weight: 800;
}
.comments {
  display: flex;
  margin: .5em;
  justify-content: space-between;
}
.deletePost {
  // margin-left: 14em;
  cursor: pointer;
}
.carousel {
  position: relative; 
  margin: 0 auto;
}
.caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
#description {
  margin: .8em;
  width: 60%;
  height:100%;
  border-radius: 8px; 
}
.comment-button {
  padding: 5px;
  border-radius: 10px; 
}
.closepost {
  padding: 1em;
  margin-left: 40%;
}
h3,h4,h5 {
  margin: .5em;
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
    opacity: 1
  }
}
`

export const PostStyle = styled.div`
.post {
  border: 1px solid black;
  margin: 1em;
}
.post-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .6em;
}
b {
  font-weight: 600;
}
.likes {
  display: flex;
  justify-content: space-between;
  gap: .7em;
}
.post h4 {
  font-weight: 800;
}
.comments {
  display: flex;
  margin: .5em;
  justify-content: space-between;
}
.deletePost {
  // margin-left: 14em;
  cursor: pointer;
}
.carousel {
  position: relative; 
  margin: 0 auto;
}
.caption {
  display: flex;
  justify-content: space-between;
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
h3,h4,h5 {
  margin: .5em;
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
    opacity: 1
  }
}
`

export const WorkoutContainer = styled.div`
  display: grid;
  /* flex-direction: column; */
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  /* grid-template-columns: repeat(auto-fit, 400px); */
  /* padding: 0rem 2rem; */
  gap: 1rem;
  grid-auto-rows: minmax(340px, 1fr);

  @media all and (max-width: ${(props) => props.theme.breakpoint.xxs}) {
    grid-template-columns: repeat(auto-fill, 1fr);
    grid-auto-rows: minmax(1fr);
  }
`;

export const WorkoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid rgb(163, 158, 158);
  border-radius: 0.25rem;
  background: ${(props) => props.theme.colors.lightgrey};
  padding: 2rem;
  /* height: 100px;
width: 250px; */
`;
// console.log(workout)

export const WorkoutDivHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%

`;


export const WorkoutButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    width: 7.3em;
    height: 2.5em;
  }
  /* justify-content: space-between; */
`;

export const WorkoutInfoContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  letter-spacing: 0.5px;
  /* background-color: white; */
`;

export const WorkoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
  border-radius: 0.25rem;
  padding: 1rem;
  /* gap: 1rem; */
  background-color: white;

  & div {
    display: flex;
  }
`;

export const ExerciseInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExerciseInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &>*:nth-child(1) {
    display: flex;
    justify-content: center; 
    align-items: center;
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
  /* border: 1px solid red; */

  & .modal-content,
  &.workout-modal {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 2.4;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 5px;
    max-width: 600px;
    min-width: 500px;
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
    margin-bottom: 0.5em;
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
`;
export const SelectExerciseBar = styled.select`
  height: 2.3em;
  width: 28em;
`;

export const EditDeleteButton = styled.button`
  width: 3.5em;
  height: 1.8em;
  margin: 1em 0.5em;
`;

export const AddExerciseButton = styled.button`
  width: 8em;
  height: 2em;
`;

export const AddWorkoutButton = styled.button`
  width: 8em;
  height: 2.2em;
  margin-top: 1em;
`;

export const FinishEditButton = styled.button`
  width: 8em;
  height: 2.4em;
  margin-top: 1em;
`;

export const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49, 49, 49, 0.8);
  /* background: red; */
`;

export const EditForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & .edit-exercise-inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  & .edit-exercise-inputs > * {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  & input {
    border: 1px solid black;
  }

  & input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ArrowSwitch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  border-top: 10px solid #7a7777; */
  /* transition: 0.25s ease-in; */
  .arrow-down {
    transform: rotate(0deg);
  }

  .arrow-up {
    transform: rotate(-180deg);
  }

  & svg {
    transition: 0.3s linear;
  }
`;

export const ExerciseImage = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  height: ${(props) => (props.status === "hide" ? "0px" : "200px")};
  transition: all 0.25s ease-in;
  /* animation: growDown 200ms linear; */
  transform-origin: top;

  & img {
    margin-top: 1rem;
    width: 200px;
  }

  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }

    100% {
      transform: scaleY(1);
    }
  }
`;

export const WorkoutIcons = styled(CenteredFlexRow)`
  width: 25px;
  /* border: 1px solid red; */

  & svg {
    /* border: 1px solid blue; */
  }
  & svg:hover{
    /* background-color: crimson; */
    transition: all .2s;
    transform : translateY(-1px);
    color: #789b78;
    
}
`;
