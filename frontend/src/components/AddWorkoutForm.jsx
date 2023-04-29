import React, { UseState } from "react";

import { Modal, ModalOverlay, EditDeleteButton, SelectExerciseBar, AddExerciseButton, AddWorkoutButton} from "../styledComponents/Profile";

function WorkoutModal({
  toggleWorkoutModal,
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
  editedExercise
}) {
  return (
    <>
      <Modal>
        <ModalOverlay onClick={toggleWorkoutModal}></ModalOverlay>
        <div className="modal-content">
          <h2> {workoutName.name} </h2>
          <form onSubmit={(e) => addExercise(e)}>
            <label htmlFor="name" className="select-exercise"> Select exercise </label>
            <SelectExerciseBar
              value={exercise.name}
              name="name"
              onChange={handleChange}
              required
            >
              <option value="not chosen"> -- Choose an exercise -- </option>
              {exercises.map((exercise) => (
                <option key={exercise} value={exercise}>
                  {exercise}
                </option>
              ))}
            </SelectExerciseBar>
            <div className="stats">
            <label htmlFor="weight"> Weight </label>
            <input
              type="number"
              value={exercise.weight}
              name="weight"
              onChange={handleChange}
              required
            />
            <label htmlFor="sets"> Sets </label>
            <input
              type="number"
              value={exercise.sets}
              name="sets"
              onChange={handleChange}
              required
            />
            <label htmlFor="reps"> Reps </label>
            <input
              type="number"
              value={exercise.reps}
              name="reps"
              onChange={handleChange}
              required
            />
             {editExerciseMode ? (
              <></>
            ) : (
              <AddExerciseButton disabled={!exercise}> Add exercise + </AddExerciseButton>
            )}
            </div>

           
          </form>

          {currentWorkout &&
            currentWorkout.map((exercise) => {
              return (
                <div>
                  <p>
                    {" "}
                    {exercise.name} : {exercise.weight} lbs - {exercise.sets}{" "}
                    sets - {exercise.reps} reps
                    {editExerciseMode && exercise._id === exerciseId ? (
                      <EditDeleteButton onClick={(e) => editExercise(e,exercise._id)}>
                        {" "}
                        confirm edit{" "}
                      </EditDeleteButton>
                    ) : (
                      <EditDeleteButton onClick={() => clickEditExercise(exercise._id)}>
                        {" "}
                        edit{" "}
                      </EditDeleteButton>
                    )}
                    <EditDeleteButton 
                      onClick={() => deleteExercise(workoutId, exercise._id)}
                    >
                      {" "}
                      delete{" "}
                    </EditDeleteButton>
                  </p>
                </div>
              );
            })}
          {editMode ? (
            <button onClick={editWorkout}> Finish editing</button>
          ) : (
            <AddWorkoutButton className="endWorkout-button" onClick={createWorkout}> Add workout </AddWorkoutButton>
          )}
        </div>
      </Modal>
    </>
  );
}

export default WorkoutModal;
