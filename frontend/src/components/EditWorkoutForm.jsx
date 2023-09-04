import React, { useState } from "react";
import Select from 'react-select'

import {
  Modal,
  ModalOverlay,
  FinishEditButton,
  EditDeleteButton,
  SelectExerciseBar,
  ExerciseImage,
  ArrowSwitch,
  ExerciseInfo2,
  AddExerciseButton,
  WorkoutDivHeader,
} from "../styledComponents/Profile";

import { EditIcon, DeleteIcon, AddIcon } from "../assets/icons.jsx";

const EditWorkoutForm = ({
  toggleEditWorkoutModal,
  workoutName,
  currentWorkout,
  exerciseId,
  exercises,
  editedExercise,
  handleEditExercise,
  deleteExercise,
  editExerciseMode,
  clickEditExercise,
  editExercise,
  currentWorkoutName,
  exerciseDB,
  activeDropdown,
  setActiveDropdown,
  addExercise,
  handleChange,
  exercise,
  updateAddExerciseEdit,
  handleEditSelection,
}) => {
  const [addExerciseMode, setAddExerciseMode] = useState(false);

  return (
    <Modal className="">
      <ModalOverlay
        onClick={toggleEditWorkoutModal}
        className=""
      ></ModalOverlay>
      <div className="modal-content">
        <>
          <WorkoutDivHeader>
            <h2> {currentWorkoutName} </h2>
            {/* <div> */}
            {addExerciseMode ? (
              <FinishEditButton
                onClick={() => {
                  setAddExerciseMode(false);
                  updateAddExerciseEdit();
                }}
              >
                {" "}
                Done
              </FinishEditButton>
            ) : (
                <AddIcon setAddExerciseMode={setAddExerciseMode} />
            )}
            {/* </div> */}
          </WorkoutDivHeader>

          {currentWorkout &&
            currentWorkout.map((exercise) => {
              if (exerciseId === exercise._id) {
                return (
                  <form onSubmit={(e) => editExercise(e, exercise._id)}>
                    <label htmlFor="name"> Change exercise </label>
                    <div>
                    <Select options={exerciseDB} className="select-exercises" onChange={handleEditSelection}/>
                      <label htmlFor="weight"> Weight </label>
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
                        onClick={(e) => editExercise(e, exercise._id)}
                      >
                        {" "}
                        confirm edit{" "}
                      </FinishEditButton>
                    </div>
                  </form>
                );
              } else {
                return (
                  <div className="inputted-exercises">
                    <ExerciseInfo2>
                      {/* <ExerciseInfo> */} <b> {exercise.name}: </b>
                      <div className="lbs-sets-reps">
                        <div>{exercise.weight} lbs - </div>
                        <div>{exercise.sets} sets - </div>
                        <div>{exercise.reps} reps </div>
                      </div>
                      <div className="exercise-info-icons">
                        {editExerciseMode && exercise._id === exerciseId ? (
                          <button onClick={() => editExercise(exercise._id)}>
                            confirm edit
                          </button>
                        ) : (
                          <EditDeleteButton
                            onClick={() => clickEditExercise(exercise._id)}
                          >
                            <EditIcon />
                          </EditDeleteButton>
                        )}
                        <EditDeleteButton
                          onClick={() =>
                            deleteExercise(workoutId, exercise._id)
                          }
                        >
                          <DeleteIcon />
                        </EditDeleteButton>
          
                      </div>
   
                      {/* </ExerciseInfo> */}
                    </ExerciseInfo2>
                  </div>
                );
              }
            })}
          {addExerciseMode && (
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
                  Add Exercise +{" "}
                </AddExerciseButton>
              </div>
            </form>
          )}
          {!addExerciseMode && <FinishEditButton onClick={toggleEditWorkoutModal}>
            {" "}
            Finish Editing
          </FinishEditButton>}

        </>
      </div>
    </Modal>
  );
};

export default EditWorkoutForm;
