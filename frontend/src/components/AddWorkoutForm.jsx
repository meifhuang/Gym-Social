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
              
              <Select options={exerciseDB} className="select-exercises" onChange={handleSelection}/>
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
                return (
                  <EditForm onSubmit={(e) => editExercise(e, exercise._id)}>
                  <Select options={exerciseDB} className="select-exercises" onChange={handleEditSelection}/>
            
                      <label htmlFor="weight"> Lbs </label>
                      <input
                        type="number"
                        min="0"
                        value={editedExercise.weight}
                        name="weight"
                        onChange={handleEditExercise}
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
                      </div>
                    </ExerciseInfo>
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
