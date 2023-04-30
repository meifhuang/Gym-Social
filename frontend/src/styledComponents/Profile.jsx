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

export const ProfileComp = styled.main`
  /* background-color: lightblue; */
  letter-spacing: 1px;
  padding: 2rem;
  margin: 2rem calc(1rem + 10vw);
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
  padding: 5rem;
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
`;

export const WorkoutInfo = styled.div`
  /* border: 1px solid blue; */
  padding: 0.5rem;
`;

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
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
    /* border: 1px solid red; */
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
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  & img {
    /* border: 1px solid blue; */
    width: 200px;
  }
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
