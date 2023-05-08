import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
// import workout from "../../backend/models/workout";

//component
// import ModalComp from "../components/Modal";
import AddWorkoutForm from "../components/AddWorkoutForm";
import EditWorkoutForm from "../components/EditWorkoutForm";
import AddPostForm from "../components/AddPostForm";
import TabBar from "../components/TabBar";

import {
  EditIcon,
  DeleteIcon,
  GridIcon,
  WorkoutIcon,
  FavoriteIcon,
} from "../assets/icons.jsx";

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
  ExerciseInfo,
  UserStats,
  About,
  ImageContainer,
  UserInformation,
  FollowButton,
  ArrowSwitch,
  ExerciseImage,
  WorkoutIcons,
  ProfileMain,
} from "../styledComponents/Profile";

export default function Profile() {
  const exerciseDB = useLoaderData();
  console.log(exerciseDB);

  const { id } = useParams();
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  function redirectNewsFeed() {
    navigate("/newsfeed");
  }

  const stats = {
    name: "",
    weight: 0,
    reps: 0,
    sets: 0,
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

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
  const [exerciseId, setExerciseId] = useState([]);
  const [loggedInId, setLoggedInId] = useState(localStorage.getItem("id"));
  const [following, setFollowing] = useState([]);

  const [numFollowing, setnumFollowing] = useState(0);
  const [numFollowers, setnumFollowers] = useState(0);
  const [numWorkouts, setnumWorkouts] = useState(0);
  const [numPosts, setnumPosts] = useState(0);

  const [editWorkoutModal, setEditWorkoutModal] = useState(false);
  const [addWorkoutModal, setAddWorkoutModal] = useState(false);
  const [currentWorkoutName, setCurrentWorkoutName] = useState("");

  // const [exerciseDB, setExerciseDB] = useState("");
  const [activeDropdown, setActiveDropdown] = useState("");

  const [postForm, setPostForm] = useState({ caption: "" });
  const [posts, setPosts] = useState([]);

  const [files, setFiles] = useState(null);

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

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostForm({
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    setFiles([...e.target.files]);
  };

  const toggleEditWorkoutModal = () => {
    setEditWorkoutModal(!editWorkoutModal);
    setCurrentWorkout([]);
  };

  const toggleAddWorkoutModal = () => {
    setAddWorkoutModal(!addWorkoutModal);
    setExerciseId("");
  };

  function signupRedirect() {
    navigate("/signup");
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
        console.log("here", res.data.posts);
        setUsername(res.data.username);
        setWorkouts(res.data.workouts);
        setFollowing(res.data.loggedInUserFollowing);
        setnumFollowing(res.data.numFollowing);
        setnumFollowers(res.data.numFollowers);
        setnumWorkouts(res.data.numWorkouts);
        setnumPosts(res.data.numPosts);
        setPosts(res.data.posts);
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

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("image", files[i]);
        }
      }
      formData.append("caption", postForm.caption);
      console.log(formData);

      const response = await axios({
        method: "post",
        url: "http://localhost:4000/createpost",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log("add post");
        console.log(response.data.posts);
        setPosts(response.data.posts);
        setnumPosts((prev) => prev + 1);
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createWorkout = async () => {
    setAddWorkoutModal(false);
    console.log(currentWorkout);
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
        setnumWorkouts((prev) => prev + 1);
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
    // setWorkoutName()
    setEditWorkoutModal(true);
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/workout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log("edit", response.data);
        const workoutData = response.data.workout;
        setworkoutId(workoutData._id);
        setCurrentWorkout(workoutData.exercises);
        setCurrentWorkoutName(workoutData.name);
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e);
    }
    setEditMode(true);
    setShowExerciseForm(true);
    setExerciseId(0);
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
        setnumWorkouts((prev) => prev - 1);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:4000/post/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        setPosts((prev) => {
          return prev.filter((post) => post._id !== response.data.postId);
        });

        setnumPosts((prev) => prev - 1);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const addExercise = async (e) => {
    e.preventDefault();

    const exerciseGif = exerciseDB.find(
      (exerciseDB_exercise) => exerciseDB_exercise.name === exercise.name
    ).gifUrl;
    console.log(exercise.name);
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
          gif: exerciseGif,
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
            gif: exerciseGif,
          },
        ]);
        console.log(
          currentWorkout,
          "CURRENT WORKOUT",
          workoutId,
          "WORKOUTID",
          workouts
        );
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
    setAddWorkoutModal(true);
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
  // console.log(editedExercise, "EDITEXERCISEPROFILE");
  const editExercise = async (e, exerciseId) => {
    e.preventDefault();

    // console.log(editedExercise.name);

    const exerciseGif = await exerciseDB.find(
      (exerciseDB_exercise) => editedExercise.name === exerciseDB_exercise.name
    ).gifUrl;
    console.log(editedExercise.name, exerciseGif);
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
          gif: exerciseGif,
        },
      });

      if (res) {
        const exercise_data = await res.data.finalUpdateExercise;

        const updateList = [...currentWorkout].map((exercise) => {
          if (exercise._id === exerciseId) {
            console.log("SAME ID");
            return {
              _id: exerciseId,
              name: exercise_data.name,
              weight: exercise_data.weight,
              sets: exercise_data.sets,
              reps: exercise_data.reps,
              gif: exerciseGif,
            };
          } else {
            console.log("same exercise");
            return exercise;
          }
        });

        setCurrentWorkout(updateList); // updates the current workout with the edited exercise
        setExercise(updateList);
        setEditExerciseMode(false);
        setExerciseId(0);

        //Updates the entire workout container list with the edited exercise
        const updateWorkoutList = await workouts.map((workout) => {
          if (workout._id === workoutId) {
            return { ...workout, exercises: updateList };
          } else {
            return workout;
          }
        });
        setWorkouts(updateWorkoutList);
      }
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  };

  const updateAddExerciseEdit = async () => {
    const updateWorkoutList = await workouts.map((workout) => {
      if (workout._id === workoutId) {
        return { ...workout, exercises: currentWorkout };
      } else {
        return workout;
      }
    });
    setWorkouts(updateWorkoutList);
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

  function gotoNewsFeed() {
    navigate("/newsfeed");
  }

  const clickEditExercise = async (exerciseId) => {
    console.log("CLICK EDIT EXERCISE");
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
    setExerciseId(exerciseId);
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
        setnumFollowers((prev) => prev + 1);
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
        setnumFollowers((prev) => prev - 1);
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
      <button onClick={gotoNewsFeed}> Return to feed </button>
      <ProfileMain>
        <TagInfo className="tag">
          <ImageContainer>
            <img src="../src/images/avatar.png"></img>
            <h2> {username} </h2>
          </ImageContainer>
          <UserInformation>
            <UserContact>
              <h3> @{username}</h3>
              <div>
                {loggedInId === id ? (
                  ""
                ) : following.some((user) => user._id === id) ? (
                  <FollowButton followed="false" onClick={() => unfollow(id)}>
                    {" "}
                    Unfollow{" "}
                  </FollowButton>
                ) : (
                  <FollowButton followed="true" onClick={() => follow(id)}>
                    {" "}
                    Follow{" "}
                  </FollowButton>
                )}
              </div>
            </UserContact>
            <UserStats>
              <div> Posts {numPosts} </div>
              <div> Workouts {numWorkouts} </div>
              <div> Followers {numFollowers}</div>
              <div> Following {numFollowing}</div>
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

          <div className="create-workout">
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
                  onClick={toggleAddWorkoutModal}
                >
                  + Create a workout
                </button>{" "}
              </form>
            ) : (
              ""
            )}
          </div>
        </TagInfo>

        {/* <AddPostForm
          handlePostChange={handlePostChange}
          postForm={postForm}
          posts={posts}
          createPost={createPost}
          handleFileUpload={handleFileUpload}
        />

        {posts &&
          posts.map((post) => {
            return (
              <div>
                <h3> POST </h3>
                <h5> {post.caption} </h5>
                <div>
                  {post.images.map((img) => {
                    return <img width="100px" height="100px" src={img.url} />;
                  })}
                </div>
                <button onClick={() => deletePost(post._id)}> Delete </button>
              </div>
            );
          })} */}

        {addWorkoutModal && (
          <AddWorkoutForm
            exerciseDB={exerciseDB}
            toggleAddWorkoutModal={toggleAddWorkoutModal}
            workoutName={workoutName}
            exercise={exercise}
            handleChange={handleChange}
            // exercises={exercises}
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
            editedExercise={editedExercise}
            handleEditExercise={handleEditExercise}
            editExercise={editExercise}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        )}

        {editWorkoutModal && (
          <EditWorkoutForm
            exerciseDB={exerciseDB}
            toggleEditWorkoutModal={toggleEditWorkoutModal}
            workoutName={workoutName}
            currentWorkout={currentWorkout}
            exerciseId={exerciseId}
            // exercises={exercises}
            editedExercise={editedExercise}
            handleEditExercise={handleEditExercise}
            editExerciseMode={editExerciseMode}
            deleteExercise={deleteExercise}
            clickEditExercise={clickEditExercise}
            editExercise={editExercise}
            currentWorkoutName={currentWorkoutName}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            addExercise={addExercise}
            exercise={exercise}
            handleChange={handleChange}
            updateAddExerciseEdit={updateAddExerciseEdit}
          />
        )}
        {/* <WorkoutContainer className="workouts">
          {console.log(workouts, "update edit add workouts")}
          {workouts &&
            workouts.map((workout) => {
              console.log(workout, "WORKOUT LOOP");
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
                        <button>Follow</button>
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
        </WorkoutContainer> */}

        <div className="container">
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              <span>
                <WorkoutIcon />
              </span>
              <div>Workouts </div>
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              <span>
                <GridIcon />
              </span>
              <div>Posts </div>
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              <span>
                <FavoriteIcon />
              </span>
              <div>Favorites</div>
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <WorkoutContainer className="workouts">
                {console.log(workouts, "update edit add workouts")}
                {workouts &&
                  workouts.map((workout) => {
                    console.log(workout, "WORKOUT LOOP");
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
                              <button>Follow</button>
                            )}
                          </WorkoutButtonContainer>
                        </WorkoutDivHeader>
                        <WorkoutInfoContainer>
                          {workout.exercises.map((exercise) => {
                            return (
                              <WorkoutInfo>
                                <ExerciseInfo>
                                  <b> {exercise.name}: </b> {exercise.weight}{" "}
                                  lbs - {exercise.sets} sets - {exercise.reps} -
                                  reps
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
                                    exercise._id === activeDropdown
                                      ? "show"
                                      : "hide"
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
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <AddPostForm
                handlePostChange={handlePostChange}
                postForm={postForm}
                posts={posts}
                createPost={createPost}
                handleFileUpload={handleFileUpload}
              />

              {posts &&
                posts.map((post) => {
                  return (
                    <div>
                      <h3> POST </h3>
                      <h5> {post.caption} </h5>
                      <div>
                        {post.images.map((img) => {
                          return (
                            <img width="100px" height="100px" src={img.url} />
                          );
                        })}
                      </div>
                      <button onClick={() => deletePost(post._id)}>
                        {" "}
                        Delete{" "}
                      </button>
                    </div>
                  );
                })}
            </div>
            <div
              className={
                toggleState === 3 ? "content  active-content" : "content"
              }
            >
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In,
                cupiditate. Provident nisi explicabo aliquid fugit libero
                dolores odit veritatis ipsa quaerat, quia voluptatibus quisquam
                magni vel, reiciendis deleniti laboriosam quod!
              </div>
            </div>
          </div>
        </div>
        <TabBar
          workouts={workouts}
          loggedInId={loggedInId}
          id={id}
          EditIcon={EditIcon}
          clickEditWorkout={clickEditWorkout}
          deleteWorkout={deleteWorkout}
          activeDropdown={activeDropdown}
        />
      </ProfileMain>

      <button onClick={gotoNewsFeed}> Return to feed </button>
    </div>
  );
}
