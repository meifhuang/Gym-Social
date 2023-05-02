import React from "react";
import {
  Modal,
  ModalOverlay,
  FinishEditButton,
  EditDeleteButton,
  SelectExerciseBar,
  ExerciseImage,
  ArrowSwitch,
  ExerciseInfo2,
} from "../styledComponents/Profile";

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
}) => {
  console.log(currentWorkout);
  return (
    <Modal className="">
      <ModalOverlay
        onClick={toggleEditWorkoutModal}
        className=""
      ></ModalOverlay>
      <div className="modal-content">
        <>
          <h2> {currentWorkoutName} </h2>
          {currentWorkout &&
            currentWorkout.map((exercise) => {
              if (exerciseId === exercise._id) {
                // console.log(exercise);
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
                      {exerciseDB.map((exercise) => (
                        <option key={exercise.id} value={exercise.name}>
                          {exercise.name}
                        </option>
                      ))}
                    </SelectExerciseBar>
                    <div>
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
                  <ExerciseInfo2>
                    {/* <ExerciseInfo> */}{" "}
                    <div>
                      <div>
                        {exercise.name}: {exercise.weight} lbs - {exercise.sets}{" "}
                        sets - {exercise.reps} reps
                      </div>
                      {editExerciseMode && exercise._id === exerciseId ? (
                        <button onClick={() => editExercise(exercise._id)}>
                          confirm edit
                        </button>
                      ) : (
                        <EditDeleteButton
                          onClick={() => clickEditExercise(exercise._id)}
                        >
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
                      <ArrowSwitch>
                        <svg
                          className={
                            activeDropdown === exercise._id
                              ? "arrow-up"
                              : "arrow-down"
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </ArrowSwitch>
                    </div>
                    <div>
                      <ExerciseImage
                        status={
                          exercise._id === activeDropdown ? "show" : "hide"
                        }
                      >
                        {" "}
                        <img src={exercise.gif} alt="loading..." />
                      </ExerciseImage>
                    </div>
                    {/* </ExerciseInfo> */}
                  </ExerciseInfo2>
                );
              }
            })}
          <FinishEditButton onClick={toggleEditWorkoutModal}>
            {" "}
            Finish editing
          </FinishEditButton>
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
