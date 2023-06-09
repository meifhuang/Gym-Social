import styled from "styled-components";

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
    line-height: 1.5;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 5px;
    max-width: 600px;
    min-width: 500px;

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
  .select-exercises {
    width: 25em;
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
    text-transform: capitalize;
  }
`;

export const SelectExerciseBar = styled.select`
  height: 2.3em;
  width: 28em;
`;

export const EditDeleteButton = styled.button``;

export const GreyHoverButton = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.lightgrey};
  border-radius: 0.5rem;
  transition: 0.1s;
  padding: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.darkgrey};
  }
`;
export const AddExerciseButton = styled(GreyHoverButton)`
  width: 7.5rem;
  height: 2.1rem;
  margin-left: 0.5rem;
`;

export const AddWorkoutButton = styled(GreyHoverButton)`
  width: 8rem;
  height: 2.5rem;
  margin-top: 1rem;
`;

export const FinishEditButton = styled(GreyHoverButton)`
  width: 8rem;
  height: 2.4rem;
  margin-top: 1rem;
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
`;

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
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin: 0rem calc(1rem + 5vw);
  gap: 2rem;

  @media all and (max-width: ${(props) => props.theme.breakpoint.xxs}) {
    padding: 0;
    /* margin: .5rem; */
  }
`;

export const ProfileComp = styled.main`
  /* background-color: lightblue; */
  display: flex;
  letter-spacing: 1px;
  padding: 2rem;
  margin: 2rem calc(1rem + 5vw);
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 1px solid red;

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
  border-bottom: 2px solid rgb(163, 158, 158);
  /* border-radius: 0.25rem; */
  padding: 3rem;
  gap: 3rem;
  width: 100%;

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

  .edit-profile-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    transition: 0.1s;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    align-self: end;
  }

  .edit-profile-icon:hover {
    background-color: rgba(218, 221, 225, 0.377);
  }

  @media all and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }
`;

export const UserInformation = styled(CenteredFlexColumn)`
  position: relative;
  align-items: start;
  gap: 1rem;
  padding: 1rem 2rem;
  flex: 1;

  @media all and (max-width: ${(props) => props.theme.breakpoint.md}) {
    align-items: center;
  }

  @media all and (max-width: ${(props) => props.theme.breakpoint.xxs}) {
    padding: 0;
  }
`;

export const ImageContainer = styled(CenteredFlexColumn)`
  gap: 1rem;

  .profilepic {
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    width: 200px;
    height: 200px;
  }

  .profilepic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserContact = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;

export const UserStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & span {
    font-weight: 600;
    margin-right: 0.25rem;
  }

  @media all and (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* & > * {
      flex: 1;
    } */
  }
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
  /* width: 1200px;
  height: 400px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 2em;
  margin-top: 1em;
  border: 1px solid red; */

  display: grid;
  /* flex-direction: column; */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* grid-template-columns: repeat(auto-fit, 400px); */
  /* padding: 0rem 2rem; */
  gap: 2rem;
  grid-auto-rows: minmax(300px, 1fr);

  @media all and (max-width: ${(props) => props.theme.breakpoint.xxs}) {
    grid-template-columns: repeat(auto-fill, 1fr);
    grid-auto-rows: minmax(1fr);
  }
`;

export const AddPostButton = styled(GreyHoverButton)`
  position: absolute;
  top: 0;
  margin-top: 1rem;
  right: 0;
  text-align: center;
  padding: 0.5rem 1rem;
  font-weight: 700;
`;

export const NewsFeed = styled.div`
  // border: 1px solid red;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  span:hover {
    color: ${(props) => props.theme.colors.green}
  }
  .no-following {
    height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

export const AddPostModal = styled(Modal)`
  & .modal-content,
  &.workout-modal {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.5;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 5px;
    /* max-width: 600px;
    min-width: 500px; */
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const AddPostModalOverlay = styled(ModalOverlay)`
  height: 100%;
`;
export const PostFormStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  & form {
    width: 100%;
  }

  & form input {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    /* width: auto; */
    width: 200px;
  }

  & .upload-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  & .upload-overlay label:hover {
    background-color: ${(props) => props.theme.colors.darkgrey};
  }
  .upload-overlay .upload-arrow-icons {
    position: absolute;
    /* border: 1px solid red; */
    width: 140%;
    display: flex;
    justify-content: space-between;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .upload-overlay button {
    background-color: rgba(130, 132, 134, 0.212);
    border-radius: 50px;
    padding: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .upload-overlay svg {
    border-radius: 50px;
    background-color: transparent;
    border: 0;
    font-size: 1rem;
    color: #181818;
    cursor: pointer;
    width: 25px;
    height: 25px;
    /* background-color: rgba(218, 221, 225, 0.212); */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .upload-overlay button:hover {
    background-color: rgba(57, 57, 58, 0.349);
  }

  .upload-overlay img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & form textarea {
    border-radius: 0.25rem;
    width: 75%;
    height: 3rem;
    padding: 0.5rem;
  }

  & .upload-overlay {
    background-color: #dbd5d5;
    width: 300px;
    height: 300px;
    /* border-radius: 50%; */
    /* object-fit: cover; */
    position: relative;
  }
`;

export const WorkoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  padding: calc(1rem + 0.2vw);
  /* height: 100px;
width: 250px; */
`
export const WorkoutDivHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  letter-spacing: 0.5px;
  /* background-color: white; */

  & .exercise-info-stats {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    text-align: center;
  }

  .exercise-info-stats b,
  .exercise-info-stats .lbs-sets-reps {
    margin-right: 1.5rem;
    /* border: 1px solid red; */
  }

  @media screen and (min-width: 800px) and (max-width: 850px) {
    .exercise-info-stats b,
    .exercise-info-stats .lbs-sets-reps {
      margin-right: 1.5rem;
    }
  }

  @media screen and (min-width: 1160px) and (max-width: 1260px) {
    .exercise-info-stats b,
    .exercise-info-stats .lbs-sets-reps {
      margin-right: 1.5rem;
    }
  }
  & .lbs-sets-reps {
    display: flex;
    justify-content: center;
    gap: 0.4rem;

    /* text-align: center; */
  }
`;

export const WorkoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
  border-radius: 0.25rem;
  padding: 1rem 0.75rem;
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
  width: 100%;
  position: relative;
  gap: 1rem;

  & .lbs-sets-reps {
    display: flex;
    justify-content: center;
    gap: 0.4rem;

    /* text-align: center; */
  }
  & .exercise-info-icons {
    display: flex;
  }

  & svg {
    width: 20px;
  }
`;

export const ExerciseInfo2 = styled.div`
  /* display: flex;
  flex-direction: column;
  width: 100%; */

  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  gap: 1rem;
  /* border: 1px solid red; */

  & > *:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .lbs-sets-reps {
    display: flex;
    gap: 0.4rem;
  }

  & .exercise-info-icons {
    display: flex;
    gap: 0.1rem;
  }
`;

export const ProPicInfoForm = styled.div`
  /* height: 300px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  align-items: center;

  & img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  .profileinfo-title {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid grey;
    margin-bottom: 1em;
  }

  .profile-inputs {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile-inputs label {
    width: 70%;
  }
  input {
    width: 100%;
  }
  textarea {
    width: 100%;
  }
  input[type="file"]::file-selector-button {
    border: none;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin-left: 5em;
  }
  button {
    margin-top: 1em;
    border-radius: 5px;
    padding: 8px;
  }
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
  position: ${(props) =>
    props.component === "addworkout" ? "relative" : "absolute"};
  right: 0px;
  top: 0;
  /* border: 1px solid red; */

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
  & svg:hover {
    /* background-color: crimson; */
    transition: all 0.2s;
    transform: translateY(-1px);
    color: #789b78;
  }
`;
