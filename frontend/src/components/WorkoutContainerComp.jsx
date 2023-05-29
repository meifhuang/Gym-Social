import React from "react";

//styling
import {
  WorkoutContainer,
  WorkoutDiv,
  WorkoutDivHeader,
  WorkoutButtonContainer,
  WorkoutInfoContainer,
  WorkoutInfo,
  ExerciseInfo,
  ArrowSwitch,
  ExerciseImage,
} from "../styledComponents/Profile";

//icons
import { DeleteIcon, SaveIcon, DeleteSaveIcon } from "../assets/icons";

const WorkoutContainerComp = ({
  workouts,
  loggedInId,
  id,
  EditIcon,
  clickEditWorkout,
  deleteWorkout,
  activeDropdown,
  saveAWorkout,
  deleteSavedWorkout,
  setActiveDropdown,
}) => {
  return (
    <WorkoutContainer className="workouts">
      {workouts &&
        workouts.map((workout) => {
          return (
            <WorkoutDiv className="">
              <WorkoutDivHeader>
                <h1> {workout.name}</h1>
                <WorkoutButtonContainer>
                  {loggedInId === id ? (
                    <>
                      <EditIcon
                        clickEditWorkout={clickEditWorkout}
                        workout={workout}
                      />
                      <DeleteIcon
                        deleteWorkout={deleteWorkout}
                        workoutId={workout._id}
                      />
                    </>
                  ) : (
                    <>
                      {!workout.savedBy.includes(loggedInId) ? (
                        <SaveIcon
                          saveAWorkout={saveAWorkout}
                          workoutId={workout._id}
                        />
                      ) : (
                        <DeleteSaveIcon
                          deleteSavedWorkout={deleteSavedWorkout}
                          workoutId={workout._id}
                        />
                      )}
                    </>
                  )}
                </WorkoutButtonContainer>
              </WorkoutDivHeader>
              <WorkoutInfoContainer>
                {workout.exercises.map((exercise) => {
                  return (
                    <WorkoutInfo>
                      <ExerciseInfo>
                        <div className="exercise-info-stats">
                          <b> {exercise.name}: </b>
                          <div className="lbs-sets-reps">
                            <div>{exercise.weight} lbs - </div>
                            <div>{exercise.sets} sets - </div>
                            <div>{exercise.reps} reps </div>
                            {/* {exercise.weight} lbs - {exercise.sets} sets -{" "}
                            {exercise.reps} - reps */}
                          </div>
                          <ArrowSwitch component="">
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
                      </ExerciseInfo>

                      <ExerciseImage
                        status={
                          exercise._id === activeDropdown ? "show" : "hide"
                        }
                      >
                        {" "}
                        <img src={exercise.gif} alt="loading..." />
                      </ExerciseImage>
                    </WorkoutInfo>
                  );
                })}
              </WorkoutInfoContainer>
            </WorkoutDiv>
          );
        })}
    </WorkoutContainer>
  );
};

export default WorkoutContainerComp;
