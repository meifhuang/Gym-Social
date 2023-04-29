import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
// import workout from "../../backend/models/workout";

//component
// import ModalComp from "../components/Modal";
import WorkoutModal from "../components/AddWorkoutForm";
import EditWorkoutForm from "../components/EditWorkoutForm";

import styled from "styled-components";
import {
  TagInfo,
  UserContact,
  ProfileComp,
  WorkoutContainer,
  WorkoutDiv,
  WorkoutDivHeader,
  WorkoutButtonContainer,
  WorkoutInfoContainer,
  WorkoutInfo,
  UserStats,
  About,
  ImageContainer,
  UserInformation,
  FollowButton
} from "../styledComponents/Profile";

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
  const [showExerciseForm, setShowExerciseForm] = useState(true);
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
  const [numFollowing, setnumFollowing] = useState(0);
  const [numFollowers, setnumFollowers] = useState(0);
  const [numWorkouts, setnumWorkouts] = useState(0);


  const [modal, setModal] = useState(false);
  const [workoutModal, setWorkoutModal] = useState(false);

  // if (modal) {
  //   document.body.classList.add("active-modal");
  // } else {
  //   document.body.classList.remove("active-modal");
  // }

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleWorkoutModal = () => {
    setWorkoutModal(!workoutModal);
  };
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
        setUsername(res.data.username);
        setWorkouts(res.data.workouts);
        setFollowing(res.data.loggedInUserFollowing);
        setnumFollowing(res.data.numFollowing); 
        setnumFollowers(res.data.numFollowers);
        setnumWorkouts(res.data.numWorkouts);

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
    setWorkoutModal(false);
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
    setModal(true);
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
    setWorkoutModal(true);
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

  const editExercise = async (e,exerciseId) => {
    e.preventDefault();
   
    console.log("in exercise route");
    try {
      const res = await axios({
        method: "put",
        url: `http://localhost:4000/workout/${workoutId}/exercise/${exerciseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          name: editedExercise.name,
          weight: editedExercise.weight,
          sets: editedExercise.sets,
          reps: editedExercise.reps,
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
        console.log("return updated after editing", updateList);
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

  const [editedExercise, setEditedExercise] = useState({
    exercise,
  });

  const handleEditExercise = (e) => {
    const { name, value } = e.target;
    setEditedExercise({
      ...editedExercise,
      [name]: value,
    });
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setWorkoutName({
      name: value,
    });
    console.log(workoutName);
  };

  function gotoNewsFeed() {
    navigate("/newsfeed");
  }

  const clickEditExercise = async (exerciseId) => {
    setModal(true);
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
        setEditedExercise(response.data.exercise);
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
        url: `http://localhost:4000/profile/${id}/follow`,
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
        setnumFollowers(prev => prev + 1);
      } else {
        throw Error("no respones");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const unfollow = async (id) => {
    console.log("in unfollow route");
    try {
      const res = await axios({
        method: "delete",
        url: `http://localhost:4000/profile/${id}/unfollow`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        console.log("unfollow", res.data.userfollowing);
        setFollowing(res.data.userfollowing);
        setnumFollowers(prev => prev - 1); 
      } else {
        throw Error("no response");
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
      {/* {loggedInId === id ? ( */}
      <ProfileComp>
        <TagInfo className="tag">
          <ImageContainer>
            <img src="../src/images/avatar.png"></img>
            <h2> {username} </h2>
          </ImageContainer>
          <UserInformation>
            <UserContact>
              <div> @{username}</div>
              <div>
                {loggedInId === id ? (
                  ""
                ) : following.some((user) => user._id === id) ? (
                  <FollowButton followed="false" onClick={() => unfollow(id)}> Unfollow </FollowButton>
                ) : (
                  <FollowButton followed="true" onClick={() => follow(id)}> Follow </FollowButton>
                )}
              </div>
            </UserContact>
            <UserStats>
              <div>Posts {numWorkouts} </div>
              <div>Followers {numFollowers}</div>
              <div>Following {numFollowing}</div>
            </UserStats>
            <About>
              {/* <div className="about-header">About Me</div> */}
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nostrum soluta quos voluptas repudiandae eaque cum tempora
                repellat laborum officia minima placeat, odit molestiae nihil
                adipisci perspiciatis exercitationem voluptatibus? Vitae, iure.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nostrum soluta quos voluptas repudiandae eaque cum tempora
                
              </div>
            </About>
          </UserInformation>
          {/* is user logged in the person your page is on ? if not, show follow/unfollow depending on if the person is in the user's follow list */}

          <div>
            {loggedInId === id ? (
              <form onSubmit={(e) => handleExerciseForm(e)}>
                <label htmlFor="workoutname"> Workout Name </label>
                <input
                  type="text"
                  value={workoutName.name}
                  name="name"
                  onChange={handleNameChange}
                  required
                />
                <button
                  disabled={!workoutName.name}
                  onClick={toggleWorkoutModal}
                >
                  Create a workout
                </button>{" "}
              </form>
            ) : (
              ""
            )}
          </div>
        </TagInfo>

        {workoutModal && (
          <WorkoutModal
            toggleWorkoutModal={toggleWorkoutModal}
            workoutName={workoutName}
            exercise={exercise}
            handleChange={handleChange}
            exercises={exercises}
            editExerciseMode={editExerciseMode}
            currentWorkout={currentWorkout}
            editWorkout={editWorkout}
            createWorkout={createWorkout}
            editMode={editMode}
            addExercise={addExercise}
            deleteExercise={deleteExercise}
            workoutId={workoutId}
            clickEditExercise={clickEditExercise}
            exerciseId={exerciseId}
            editExercise={editExercise}
          />
        )}

        {modal && (
          <EditWorkoutForm
            toggleModal={toggleModal}
            workoutName={workoutName}
            currentWorkout={currentWorkout}
            exerciseId={exerciseId}
            exercises={exercises}
            editedExercise={editedExercise}
            handleEditExercise={handleEditExercise}
            editExerciseMode={editExerciseMode}
            deleteExercise={deleteExercise}
            clickEditExercise={clickEditExercise}
            editExercise={editExercise}
          />
        )}
        <WorkoutContainer className="workouts">
          {workouts &&
            workouts.map((workout) => {
              return (
                <WorkoutDiv className="">
                  <WorkoutDivHeader>
                    <h3> {workout.name} </h3>
                    <WorkoutButtonContainer>
                      {loggedInId === id ? (
                        <button onClick={() => clickEditWorkout(workout._id)}>
                          {" "}
                          edit workout{" "}
                        </button>
                      ) : (
                        ""
                      )}
                      {loggedInId === id ? (
                        <button onClick={() => deleteWorkout(workout._id)}>
                          {" "}
                          delete workout{" "}
                        </button>
                      ) : (
                        ""
                      )}
                    </WorkoutButtonContainer>
                  </WorkoutDivHeader>
                  <WorkoutInfoContainer>
                    {workout.exercises.map((exercise) => {
                      return (
                        <WorkoutInfo>
                          <p>
                            {exercise.name} - {exercise.weight} lbs -{" "}
                            {exercise.sets} sets - {exercise.reps} - reps
                          </p>
                        </WorkoutInfo>
                      );
                    })}
                  </WorkoutInfoContainer>
                </WorkoutDiv>
              );
            })}
        </WorkoutContainer>
        {/* <div className="about">
          <div className="about-header">About Me</div>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            soluta quos voluptas repudiandae eaque cum tempora repellat laborum
            officia minima placeat, odit molestiae nihil adipisci perspiciatis
            exercitationem voluptatibus? Vitae, iure.
          </div>
        </div>
        <div className="friends">
          Followed
          {following.map((user) => {
            return <h5> {user.fname}</h5>;
          })}
        </div> */}
      </ProfileComp>
      <button onClick={gotoNewsFeed}> Return to feed </button>
    </div>
  );
}
