import styled from "styled-components";

export const TagInfo = styled.div`
  display: flex;
  /* margin: 2rem; */
  border: 2px solid rgb(163, 158, 158);
  border-radius: 0.25rem;
  img {
    width: 200px;
  }
`;

export const UserContact = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
`;

export const ProfileComp = styled.main`
  /* background-color: lightblue; */
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
    background-color: blue;
    grid-column: 1/9;
    grid-row: 1/2;
  }

  & .workouts {
    grid-area: workouts;
    /* background-color: grey; */
    grid-column: 4/9;
    grid-row: 2/4;
  }

  & .about {
    grid-area: about;
    background-color: brown;
    grid-column: 1/4;
    grid-row: 2/3;
  }

  & .friends {
    grid-area: friends;
    background-color: yellow;
    grid-column: 1/4;
    grid-row: 3/4;
  }
`;

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



  & .btn-modal {
    padding: 10px 20px;
    display: block;
    margin: 100px auto 0;
    font-size: 18px;
    border: 1px solid red;
  }
  & .modal-content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    max-width: 600px;
    min-width: 300px;
    border: 1px solid red;
  }

  &.workout-modal{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    max-width: 600px;
    min-width: 300px;
  }

  & .close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 7px;
    border: 1px solid red;
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
  background: red;
`;
