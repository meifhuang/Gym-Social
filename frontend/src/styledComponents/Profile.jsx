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

export const TagInfo = styled.div`
  display: flex;
  /* margin: 2rem; */
  /* border: 2px solid rgb(163, 158, 158); */
  border-radius: 0.25rem;
  padding: 5rem;
  gap: 3rem;

  img {
    width: 200px;
  }
`;

export const UserInformation = styled(CenteredFlexColumn)`
  align-items: start;
  gap: 1rem;
  padding: 2rem;
`;

export const ImageContainer = styled(CenteredFlexColumn)`
  gap: 1rem;
`;

export const UserContact = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const About = styled(CenteredFlexColumn)`
 line-height: 1.25rem;
`

export const ProfileComp = styled.main`
  /* background-color: lightblue; */
  letter-spacing: 1px;
  padding: 2rem;
  margin: 2rem calc(1rem + 10vw);
  gap: 2rem;
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  /* grid-template-rows: repeat(auto-fit, 300px); */

  /* grid-auto-flow: row dense; */
  /* grid-template-areas:
  "tag tag tag tag tag tag tag tag"
  "about about about workouts workouts workouts workouts workouts"
  "friends friends friends workouts workouts workouts workouts workouts"
  "friends friends friends workouts workouts workouts workouts workouts"
  "friends friends friends workouts workouts workouts workouts workouts"
  "friends friends friends workouts workouts workouts workouts workouts"; */

  & .tag {
    grid-area: tag;
    /* background-color: blue; */
    grid-column: 1/9;
    grid-row: 1/2;
  }

  & .workouts {
    grid-area: workouts;
    /* background-color: grey; */
    grid-column: 1/9;
    grid-row: 2/4;
  }

  /* & .about {
    grid-area: about;
    background-color: brown;
    grid-column: 1/4;
    grid-row: 2/3;
  } */

  /* & .friends {
    grid-area: friends;
    background-color: yellow;
    grid-column: 1/4;
    grid-row: 3/4;
  } */
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* padding: 0rem 2rem; */
  gap: 1rem;
  justify-content: center;
  /* align-items: center; */
  /* grid-template-rows: auto; */
  grid-auto-rows: minmax(300px, 1fr);
  /* grid-auto-flow: row; */
`;

export const WorkoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid rgb(163, 158, 158);
  border-radius: 0.25rem;
  background: ${(props) => props.theme.colors.lightgrey};
  padding: 1rem;
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
  /* justify-content: space-between; */
`;

export const WorkoutInfoContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  letter-spacing: 0.5px;
`;

export const WorkoutInfo = styled.div`
  border: 1px solid red;
`;

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  border: 1px solid red;

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
    border: 1px solid red;
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
  }
  input {
    width: 3.1em;
    height: 2.1em;
    margin: .5em;
  }
  select {
    height: 2.3em;
    width: 25em;
  }
  .addExercise-button {
    height: 2.2em;
    width: 10em;
    margin-left: 1em;
  }
  .endWorkout-button {
    height: 2.5em;
    width: 10em;
    margin-top: 1em
  }
  .deleteExercise-button, 
  .editExercise-button {
    width: 3.5em; 
    height: 1.8em; 
    margin: 1em .5em; 
  }
  
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
