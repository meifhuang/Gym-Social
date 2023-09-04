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
  const getDate = (date) => {
    const created = new Date(date) 
    return created.toDateString()
  }
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
            
                          </div>
                         
                        </div>
                      </ExerciseInfo>
                    </WorkoutInfo>
                  );
                })}
                  <p> Created on {getDate(workout.createdAt)} </p>
              </WorkoutInfoContainer>
            
            </WorkoutDiv>
          );
        })}
    </WorkoutContainer>
  );
};

export default WorkoutContainerComp;
