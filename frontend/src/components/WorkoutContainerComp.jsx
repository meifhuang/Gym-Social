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
import {
  DeleteIcon,
  SaveIcon,
} from "../assets/icons";

const WorkoutContainerComp = ({
  workouts,
  loggedInId,
  id,
  EditIcon,
  clickEditWorkout,
  deleteWorkout,
  activeDropdown,
  saveWorkout
}) => {
  return (
    <WorkoutContainer className="workouts">
      {workouts &&
        workouts.map((workout) => {
          return (
            <WorkoutDiv className="">
              <WorkoutDivHeader>
                <h1> {workout.name} </h1>
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
                    <SaveIcon
                    saveWorkout={saveWorkout}
                    workoutId={workout._id}/>
                  )}
                </WorkoutButtonContainer>
              </WorkoutDivHeader>
              <WorkoutInfoContainer>
                {workout.exercises.map((exercise) => {
                  return (
                    <WorkoutInfo>
                      <ExerciseInfo>
                        <b> {exercise.name}: </b> {exercise.weight} lbs -{" "}
                        {exercise.sets} sets - {exercise.reps} - reps
                        <ArrowSwitch>
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
