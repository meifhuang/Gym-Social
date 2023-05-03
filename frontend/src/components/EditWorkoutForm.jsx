import React, { useState } from "react";
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
<<<<<<< HEAD
  WorkoutDivHeader,
=======
>>>>>>> f7cde5eaf59d96fb8dd51d29a2b6834be6a7d939
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
}) => {
  const [addExerciseMode, setAddExerciseMode] = useState(false);
  console.log(currentWorkout);
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
              // <svg
              //   onClick={() => {
              //     setAddExerciseMode(false);
              //     updateAddExerciseEdit();
              //   }}
              //   viewBox="0 0 24 24"
              //   width="24"
              //   height="24"
              //   stroke="currentColor"
              //   stroke-width="2"
              //   fill="none"
              //   stroke-linecap="round"
              //   stroke-linejoin="round"
              //   class="css-i6dzq1"
              // >
              //   <polyline points="20 6 9 17 4 12"></polyline>
              // </svg>
              // <svg
              //   onClick={() => {
              //     setAddExerciseMode(false);
              //     updateAddExerciseEdit();
              //   }}
              //   viewBox="0 0 24 24"
              //   width="24"
              //   height="24"
              //   stroke="currentColor"
              //   stroke-width="2"
              //   fill="none"
              //   stroke-linecap="round"
              //   stroke-linejoin="round"
              //   class="css-i6dzq1"
              // >
              //   <polyline points="9 11 12 14 22 4"></polyline>
              //   <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              // </svg>
            ) : (
              <>
                {/* <FinishEditButton onClick={() => setAddExerciseMode(true)}>
                    Add Exercise
                  </FinishEditButton> */}
                <AddIcon setAddExerciseMode={setAddExerciseMode} />
              </>
            )}
            {/* </div> */}
          </WorkoutDivHeader>

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
          {addExerciseMode && (
            <form onSubmit={(e) => addExercise(e)}>
              <label htmlFor="name" className="select-exercise">
                {" "}
                Select exercise{" "}
              </label>
              <SelectExerciseBar
                value={exercise.name}
                name="name"
                onChange={handleChange}
                required
              >
                <option value="not chosen"> -- Choose an exercise -- </option>
                {exerciseDB.map((exercise) => (
                  <option key={exercise.id} value={exercise.name}>
                    {exercise.name}
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
