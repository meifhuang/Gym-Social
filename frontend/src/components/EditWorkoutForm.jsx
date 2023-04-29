import React from "react";
import { Modal, ModalOverlay, FinishEditButton, EditDeleteButton, SelectExerciseBar } from "../styledComponents/Profile";
const EditWorkoutForm = ({
  toggleModal,
  workoutName,
  currentWorkout,
  exerciseId,
  exercises,
  editedExercise,
  handleEditExercise,
  deleteExercise,
  editExerciseMode,
    clickEditExercise,
  editExercise
}) => {
  return (
    <Modal className="">
      <ModalOverlay onClick={toggleModal} className=""></ModalOverlay>
      <div className="modal-content">
        <>
          <h2> {workoutName.name} </h2>

          {currentWorkout &&
            currentWorkout.map((exercise) => {
              if (exerciseId === exercise._id) {
                console.log(exercise);
                return (
                  <form onSubmit={(e) => editExercise(e, exercise._id)}>
                    <label htmlFor="name"> Change exercise </label>
                    <SelectExerciseBar
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
                      {exercises.map((exercise) => (
                        <option key={exercise} value={exercise}>
                          {exercise}
                        </option>
                       
                      ))}
                    </SelectExerciseBar>
                    <div>
                    <label htmlFor="weight"> Weight </label>
                    <input
                      type="number"
                      value={editedExercise.weight}
                      name="weight"
                      onChange={handleEditExercise}
                      // placeholder={exercise.weight}
                      required
                    />
                    <label htmlFor="sets"> Sets </label>
                    <input
                      type="number"
                      value={editedExercise.sets}
                      name="sets"
                      onChange={handleEditExercise}
                      required
                    />
                    <label htmlFor="reps"> Reps </label>
                    <input
                      type="number"
                      value={editedExercise.reps}
                      name="reps"
                      onChange={handleEditExercise}
                      required
                    />
                  
                    <FinishEditButton
                      type="submit"
                      onClick={() => editExercise(exercise._id)}
                    >
                      {" "}
                      confirm edit{" "}
                    </FinishEditButton>
                    </div>
                    </form>
                );
              } else {
                return (
                  <div>
                    <p>
                      {" "}
                      {exercise.name}: {exercise.weight} lbs - {exercise.sets}{" "}
                      sets - {exercise.reps} reps
                      {editExerciseMode && exercise._id === exerciseId ? (
                        <button onClick={() => editExercise(exercise._id)}>
                          confirm edit
                        </button>
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
              }
            })}
          <FinishEditButton onClick={toggleModal}> Finish editing</FinishEditButton>
          {/* {editMode ? (
                      <button onClick={editWorkout}> Finish editing</button>
                    ) : (
                      <button onClick={createWorkout}> End workout </button>
                    )} */}
        </>
      </div>
    </Modal>
  );
};

export default EditWorkoutForm;
