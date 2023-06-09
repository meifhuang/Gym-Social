import React, { useState , useEffect } from "react";
import Select from 'react-select'

import ArrowSwitchChev from "../assets/chevron-down.svg";
import {
  Modal,
  ModalOverlay,
  EditDeleteButton,
  SelectExerciseBar,
  AddExerciseButton,
  AddWorkoutButton,
  EditForm,
  FinishEditButton,
  ArrowSwitch,
  ExerciseImage,
  ExerciseInfo,
  // ArrowContainer,
} from "../styledComponents/Profile";

import { EditIcon, DeleteIcon } from "../assets/icons";
function AddWorkoutForm({
  exerciseDB,
  toggleAddWorkoutModal,
  workoutName,
  exercise,
  handleChange,
  exercises,
  editExerciseMode,
  currentWorkout,
  editWorkout,
  createWorkout,
  editMode,
  addExercise,
  deleteExercise,
  workoutId,
  clickEditExercise,
  exerciseId,
  editExercise,
  editedExercise,
  handleEditExercise,
  activeDropdown,
  setActiveDropdown,
  handleSelection,
  handleEditSelection
}) {
  const [toggleArrow, setToggleArrow] = useState(false);
  // const [activeDropdown, setActiveDropdown] = useState("");


  return (
    <>
      <Modal>
        <ModalOverlay onClick={toggleAddWorkoutModal}></ModalOverlay>
        <div className="modal-content">
          <h2> {workoutName.name} </h2>
          {editExerciseMode ? (
            <></>
          ) : (
            <form onSubmit={(e) => addExercise(e)}>
               {/* <label htmlFor="search"> Search for exercises</label> */}
                {/* <input type="text"
                       list="exercises"
                       placeholder="Search exercise"
                       onChange={handleSearchChange}
                       value={searchInput}
                       className="search"
                  /> */}
              {/* <label htmlFor="name" className="select-exercise">
                {" "}
                Select exercise{" "}
              </label> */}
              {/* <SelectExerciseBar
                value={exercise.name}
                name="name"
                onChange={handleChange}
                required
              > */}
              <Select options={exerciseDB} className="select-exercises" onChange={handleSelection}/>
                {/* <option value="not chosen"> -- Choose an exercise -- </option> */}
                {/* {exerciseDBFilter.map((exercise) => (
                  <option key={exercise.id} value={exercise.name}>
                    {/* {exercise.name} */}
                  {/* </option> */}
              {/* ))}  */}
                
              {/* </SelectExerciseBar> */}
              <div className="stats">
                <label htmlFor="weight"> Weight </label>
                <input
                  type="number"
                  value={exercise.weight}
                  name="weight"
                  onChange={handleChange}
                  min="0"
                  required
                />
                <label htmlFor="sets"> Sets </label>
                <input
                  type="number"
                  value={exercise.sets}
                  name="sets"
                  onChange={handleChange}
                  min="0"
                  required
                />
                <label htmlFor="reps"> Reps </label>
                <input
                  type="number"
                  value={exercise.reps}
                  name="reps"
                  onChange={handleChange}
                  min="0"
                  required
                />

                <AddExerciseButton disabled={!exercise}>
                  {" "}
                  Add exercise +{" "}
                </AddExerciseButton>
              </div>
            </form>
          )}

          {currentWorkout &&
            currentWorkout.map((exercise) => {
              if (exerciseId === exercise._id) {
                // console.log(exercise);
                return (
                  <EditForm onSubmit={(e) => editExercise(e, exercise._id)}>
                  <Select options={exerciseDB} className="select-exercises" onChange={handleEditSelection}/>
                    
                    {/* <label htmlFor="name"> Change exercise </label> */}
                    {/* <div className="edit-exercise-inputs">
                      <select
                        value={editedExercise.name}
                        name="name"
                        onChange={handleEditExercise}
                        required
                      >
                        <option value="not chosen">
                          {" "}
                          -- Choose an exercise --{" "}
                        </option>
                        <option value="" disabled selected hidden>
                          {exercise.name}
                        </option>
                        {exerciseDB.map((exercise) => (
                          <option key={exercise.id} value={exercise.name}>
                            {exercise.name}
                          </option>
                        ))} */}
                        {/* {exercises.map((exercise) => (
                          <option key={exercise} value={exercise}>
                            {exercise}
                          </option>
                        ))}
                      </select> */}
                      <label htmlFor="weight"> Lbs </label>
                      <input
                        type="number"
                        min="0"
                        value={editedExercise.weight}
                        name="weight"
                        onChange={handleEditExercise}
                        // placeholder={exercise.weight}
                        required
                      />
                      <label htmlFor="sets"> Sets </label>
                      <input
                        type="number"
                        min="0"
                        value={editedExercise.sets}
                        name="sets"
                        onChange={handleEditExercise}
                        required
                      />
                      <label htmlFor="reps"> Reps </label>
                      <input
                        type="number"
                        min="0"
                        value={editedExercise.reps}
                        name="reps"
                        onChange={handleEditExercise}
                        required
                      />

                      <FinishEditButton
                        type="submit"
                        // onClick={() => editExercise(exercise._id)}
                      >
                        {" "}
                        confirm edit{" "}
                      </FinishEditButton>
                    {/* </div> */}
                  </EditForm>
                );
              } else {
                return (
                  <div className="inputted-exercises">
                    <ExerciseInfo>
                      {" "}
                      <b> {exercise.name}: </b>
                      <div className="lbs-sets-reps">
                        <div>{exercise.weight} lbs - </div>
                        <div>{exercise.sets} sets - </div>
                        <div>{exercise.reps} reps </div>
                      </div>
                      <div className="exercise-info-icons">
                        <EditIcon
                          clickEditWorkout={clickEditExercise}
                          workout={exercise}
                        />
                        <DeleteIcon
                          deleteWorkout={deleteExercise}
                          workoutId={workoutId}
                          exerciseId={exercise._id}
                        />
                        <ArrowSwitch component="addworkout">
                          <svg
                            className={
                              activeDropdown === exercise._id
                                ? "arrow-up feather feather-chevron-down"
                                : "arrow-down feather feather-chevron-down"
                            }
                            onClick={() => {
                              if (activeDropdown === exercise._id) {
                                setActiveDropdown("");
                              } else {
                                setActiveDropdown(exercise._id);
                              }
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            // class="feather feather-chevron-down"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </ArrowSwitch>
                      </div>
                      {/* </div> */}
                      {/* </ArrowContainer> */}
                    </ExerciseInfo>
                    <ExerciseImage
                      status={exercise._id === activeDropdown ? "show" : "hide"}
                    >
                      {" "}
                      <img src={exercise.gif} alt="loading..." />
                    </ExerciseImage>
                  </div>
                );
              }
            })}
          {editMode ? (
            <button onClick={editWorkout}> Finish editing</button>
          ) : (
            <AddWorkoutButton
              className="endWorkout-button"
              onClick={createWorkout}
            >
              {" "}
              Add Workout{" "}
            </AddWorkoutButton>
          )}
        </div>
      </Modal>
    </>
  );
}

export default AddWorkoutForm;
