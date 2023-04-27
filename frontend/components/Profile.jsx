import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../src/AuthContext";
// import workout from "../../backend/models/workout";

import styled from "styled-components";
const TagInfo = styled.div`
  display: flex;
  /* margin: 2rem; */
  border: 2px solid rgb(163, 158, 158);
  border-radius: 0.25rem;
  img {
    width: 200px;
  }
`;

const UserContact = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
`;

const ProfileComp = styled.main`
  /* background-color: lightblue; */
  padding: 2rem;
  margin: 2rem calc(1rem + 10vw);
  gap: 2rem;
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  /* grid-template-rows: repeat(auto-fit, 300px); */

  /* grid-auto-flow: row dense; */
  /* grid-template-areas:
  "tag tag tag tag tag tag tag tag"
  "about about about workouts workouts workouts workouts workouts"
  "friends friends friends workouts workouts workouts workouts workouts"
  "friends friends friends workouts workouts workouts workouts workouts"
  "friends friends friends workouts workouts workouts workouts workouts"
  "friends friends friends workouts workouts workouts workouts workouts"; */

  & .tag {
    grid-area: tag;
    background-color: blue;
    grid-column: 1/9;
    grid-row: 1/2;
  }

  & .workouts {
    grid-area: workouts;
    background-color: grey;
    grid-column: 4/9;
    grid-row: 2/4;
  }

  & .about {
    grid-area: about;
    background-color: brown;
    grid-column: 1/4;
    grid-row: 2/3;
  }

  & .friends {
    grid-area: friends;
    background-color: yellow;
    grid-column: 1/4;
    grid-row: 3/4;
  }
`;

const WorkoutContainer = styled.div`
  display: grid;
  /* flex-direction: column; */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* padding: 0rem 2rem; */
  gap: 1rem;
  justify-content: center;
  /* align-items: center; */
  /* grid-template-rows: auto; */
  grid-auto-rows: minmax(300px, 1fr);
  /* grid-auto-flow: row; */
`;

const WorkoutDiv = styled.div`
  border: 2px solid rgb(163, 158, 158);
  border-radius: 0.25rem;
  /* height: 100px;
width: 250px; */
`;
// console.log(workout)

export default function Profile() {
  const { id } = useParams();
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  function redirectNewsFeed() {
    navigate("/newsfeed");
  }

  const exercises = [
    "bench press",
    "conventional deadlifts",
    "shoulder presses",
    "barbell squats",
    "barbell rows",
  ];

  const stats = {
    name: "",
    weight: 0,
    reps: 0,
    sets: 0,
  };

  const [workoutList, setworkoutList] = useState([]);
  const [username, setUsername] = useState("");
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [changeId, setChangeId] = useState("");
  const [exercise, setExercise] = useState(stats);
  const [workoutName, setWorkoutName] = useState({ name: "" });
  const [workoutId, setworkoutId] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editExerciseMode, setEditExerciseMode] = useState(false);
  const [exerciseId, setexerciseId] = useState([]);
  const [loggedInId, setLoggedInId] = useState(localStorage.getItem("id"));
  const [following, setFollowing] = useState([]);

  function registerRedirect() {
    navigate("/register");
  }

  const getWorkout = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:4000/profile/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        console.log("data", res.data.workouts);
        setUsername(res.data.username);
        setWorkouts(res.data.workouts);
        console.log("data- following", res.data.loggedInUserFollowing);
        setFollowing(res.data.loggedInUserFollowing);
      } else {
        console.log("no responses");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getWorkout();
  }, []);

  const createWorkout = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/createuserworkout",
        data: {
          name: workoutName,
          workoutList: currentWorkout,
          workoutId: workoutId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log("add workout to user");
        setWorkouts(response.data.workouts);
        setworkoutId(response.data.workouts._id);
        setCurrentWorkout([]);
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e);
    }
    setShowExerciseForm(false);
  };

  const editWorkout = async (workoutId) => {
    setShowExerciseForm(false);
    setEditMode(false);
    setCurrentWorkout([]);
    //alternative to calling this?
    getWorkout();
  };

  const clickEditWorkout = async (workoutId) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/workout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log("edit", response.data.workouts);
        setworkoutId(response.data.workoutId);
        setCurrentWorkout(response.data.workouts);
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e);
    }
    setEditMode(true);
    setShowExerciseForm(true);
    setexerciseId(0);
  };

  const deleteWorkout = async (workoutId) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:4000/workout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        setWorkouts((prev) => {
          return prev.filter(
            (workout) => workout._id !== response.data.workoutId
          );
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const addExercise = async (e) => {
    e.preventDefault();
    try {
      console.log("addeddd exercise");
      const res = await axios({
        method: "put",
        url: `http://localhost:4000/workout/${workoutId}/createexercise`,
        data: {
          name: exercise.name,
          weight: exercise.weight,
          sets: exercise.sets,
          reps: exercise.reps,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res) {
        console.log("adding", res.data.exercise);
        setCurrentWorkout([
          ...currentWorkout,
          {
            _id: res.data.exercise._id,
            name: exercise.name,
            weight: exercise.weight,
            sets: exercise.sets,
            reps: exercise.reps,
          },
        ]);
        console.log("whats the workout", currentWorkout);

        // setworkoutList([
        //   ...workoutList,
        //   {
        //     name: exercise.name,
        //     weight: exercise.weight,
        //     sets: exercise.sets,
        //     reps: exercise.reps,
        //   },
        // ]);
      } else {
        console.log("NO RES");
      }
    } catch (e) {
      console.log(e.message);
      console.log(e);
    }
  };

  const handleExerciseForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/createworkout",
        data: {
          name: workoutName,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response.data);
        setworkoutId(response.data.workoutId);
        setCurrentWorkout(currentWorkout);
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e);
    }
    setShowExerciseForm(true);
    setEditMode(false);
    setEditExerciseMode(false);
  };

  const editExercise = async (exerciseId) => {
    console.log("in exercise route");
    // console.log(exerciseId);
    // console.log(workoutList)
    try {
      const res = await axios({
        method: "put",
        url: `http://localhost:4000/workout/${workoutId}/exercise/${exerciseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          // _id: exerciseId,
          name: exercise.name,
          weight: exercise.weight,
          sets: exercise.sets,
          reps: exercise.reps,
        },
      });

      if (res) {
        const exercise_data = res.data.finalUpdateExercise;
        const workout = await res.data.updatedWorkouts;
        console.log(currentWorkout);
        // setCurrentWorkout(workout);
        const updateList = currentWorkout.map((exercise) => {
          if (exercise._id === exerciseId) {
            return {
              _id: exerciseId,
              name: exercise_data.name,
              weight: exercise_data.weight,
              sets: exercise_data.sets,
              reps: exercise_data.reps,
            };
          } else {
            return exercise;
          }
        });
        setCurrentWorkout(updateList);
        console.log("return after editing", updateList);
        setExercise(updateList);
        setEditExerciseMode(false);
        setexerciseId(0);
        console.log("whats the current", currentWorkout);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteExercise = async (workoutId, exerciseId) => {
    console.log("in delete route");
    try {
      const res = await axios({
        method: "delete",
        url: `http://localhost:4000/workout/${workoutId}/exercise/${exerciseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        setCurrentWorkout((prev) => {
          return prev.filter(
            (exercise) => exercise._id !== res.data.exerciseId
          );
        });
        console.log(currentWorkout);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise({
      ...exercise,
      [name]: value,
    });
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setWorkoutName({
      name: value,
    });
  };

  function gotoNewsFeed() {
    navigate("/newsfeed");
  }

  const clickEditExercise = async (exerciseId) => {
    console.log("retrieve exercise info");
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/exercise/${exerciseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log("in clickEdit Exercise", response.data.exercise);
        setExercise(response.data.exercise);
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e);
    }
    setEditExerciseMode(true);
    setexerciseId(exerciseId);
  };

  const follow = async (id) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/profile/follow",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          id: id,
        },
      });
      if (res) {
        console.log("FOLLOWED");
        console.log(res.data.following);
        setFollowing(res.data.following);
      } else {
        throw Error("no respones");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const logout = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:4000/logout",
      });
      if (response) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        // setUsername(null);
        navigate("/");
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <ProfileComp>
        <TagInfo className="tag">
          <img src="../src/images/avatar.png"></img>
          <UserContact>
            <div>Jacky</div>
            <div>@jacky</div>
          </UserContact>
        </TagInfo>
        <WorkoutContainer className="workouts">
          {workouts.length <= 0 ? (
            <h3> Currently has no workouts </h3>
          ) : (
            workouts.map((workout) => {
              return (
                <WorkoutDiv>
                  <h3> {workout.name} </h3>
                  {workout.exercises.map((exercise) => {
                    return (
                      <p>
                        {exercise.name} - {exercise.weight} lbs -{" "}
                        {exercise.sets} sets - {exercise.reps} - reps
                      </p>
                    );
                  })}
                </WorkoutDiv>
              );
            })
          )}
          {/* <WorkoutDiv>WORKOUT INFORMATION</WorkoutDiv>
          <WorkoutDiv>WORKOUT INFORMATION</WorkoutDiv>
          <WorkoutDiv>WORKOUT INFORMATION</WorkoutDiv> */}
        </WorkoutContainer>
        <div className="about">
          <div className="about-header">About Me</div>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            soluta quos voluptas repudiandae eaque cum tempora repellat laborum
            officia minima placeat, odit molestiae nihil adipisci perspiciatis
            exercitationem voluptatibus? Vitae, iure.
          </div>
        </div>
        <div className="friends">FRIENDS</div>
      </ProfileComp>

      {loggedInId === id ? (
        <>
          <h1> Welcome {username}! </h1>
          <button onClick={redirectNewsFeed}> News Feed </button>
          <button onClick={logout}> Logout </button>
          <h1> Workouts </h1>

          {showExerciseForm ? (
            <>
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
                        {exercise.name} : {exercise.weight} lbs -{" "}
                        {exercise.sets} sets - {exercise.reps} reps
                        {editExerciseMode && exercise._id === exerciseId ? (
                          <button onClick={() => editExercise(exercise._id)}>
                            {" "}
                            confirm edit{" "}
                          </button>
                        ) : (
                          <button
                            onClick={() => clickEditExercise(exercise._id)}
                          >
                            {" "}
                            edit{" "}
                          </button>
                        )}
                        <button
                          onClick={() =>
                            deleteExercise(workoutId, exercise._id)
                          }
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
            </>
          ) : (
            <>
              <form onSubmit={(e) => handleExerciseForm(e)}>
                <label htmlFor="workoutname"> Workout Name </label>
                <input
                  type="text"
                  value={workoutName.name}
                  name="name"
                  onChange={handleNameChange}
                  required
                />
                <button> Create a workout + </button>
              </form>

              <div>
                {workouts &&
                  workouts.map((workout) => {
                    return (
                      <div className="workouts">
                        <h3> {workout.name} </h3>
                        {workout.exercises.map((exercise) => {
                          return (
                            <>
                              <p>
                                {exercise.name} - {exercise.weight} lbs -{" "}
                                {exercise.sets} sets - {exercise.reps} - reps
                              </p>
                            </>
                          );
                        })}

                        <button onClick={() => clickEditWorkout(workout._id)}>
                          {" "}
                          edit workout{" "}
                        </button>
                        <button onClick={() => deleteWorkout(workout._id)}>
                          {" "}
                          delete workout{" "}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h1> {username} </h1>
          {following.some((user) => user._id === id) ? (
            <>
              {workouts.length <= 0 ? (
                <h3> Currently has no workouts </h3>
              ) : (
                workouts.map((workout) => {
                  return (
                    <div className="workouts">
                      <h3> {workout.name} </h3>
                      {workout.exercises.map((exercise) => {
                        return (
                          <p>
                            {exercise.name} - {exercise.weight} lbs -{" "}
                            {exercise.sets} sets - {exercise.reps} - reps
                          </p>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </>
          ) : (
            <button onClick={() => follow(id)}> Follow </button>
          )}

          <button onClick={gotoNewsFeed}> Return to feed </button>
        </>
      )}
    </div>
  );
}
