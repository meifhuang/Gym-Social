import React, { UseState } from "react";

import { Modal, ModalOverlay } from "../styledComponents/Profile";

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
}) {
  return (
    <>
      <Modal>
        <ModalOverlay onClick={toggleWorkoutModal}></ModalOverlay>
        <div className="modal-content">
          <h2> {workoutName.name} </h2>
          <form onSubmit={(e) => addExercise(e)}>
            <label htmlFor="name"> Select exercise </label>
            <select
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
            </select>
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
              <button disabled={!exercise}> Add exercise + </button>
            )}
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
                      <button onClick={() => editExercise(exercise._id)}>
                        {" "}
                        confirm edit{" "}
                      </button>
                    ) : (
                      <button onClick={() => clickEditExercise(exercise._id)}>
                        {" "}
                        edit{" "}
                      </button>
                    )}
                    <button
                      onClick={() => deleteExercise(workoutId, exercise._id)}
                    >
                      {" "}
                      delete{" "}
                    </button>
                  </p>
                </div>
              );
            })}
          {editMode ? (
            <button onClick={editWorkout}> Finish editing</button>
          ) : (
            <button onClick={createWorkout}> End workout </button>
          )}
        </div>
      </Modal>
    </>
  );
}

export default WorkoutModal;
