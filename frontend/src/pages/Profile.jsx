import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
// import workout from "../../backend/models/workout";

//component
// import ModalComp from "../components/Modal";
import AddWorkoutForm from "../components/AddWorkoutForm";
import EditWorkoutForm from "../components/EditWorkoutForm";
import ProfilePictureForm from "../components/ProfilePictureForm";
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
  PostContainer
} from "../styledComponents/Profile";

export default function Profile() {
  const exerciseDB = useLoaderData();

  const { id } = useParams();
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

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
  const [user, setUser] = useState([]);
  const [userPicUrl, setUserPicUrl] = useState("");

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
  const [savedWorkouts, setSavedWorkouts] = useState([]);
 

  // const [exerciseDB, setExerciseDB] = useState("");
  const [activeDropdown, setActiveDropdown] = useState("");

  const [postForm, setPostForm] = useState({ caption: "" });
  const [posts, setPosts] = useState([]);


  const [files, setFiles] = useState(null);
  const [proPic, setProPic] = useState(null)
  const [prevSlidePosition, setPrevSlidePosition] = useState({});



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

  const handlePicChange = (e) => {
    setProPic([...e.target.files]);
  }

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

  const getUser = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:4000/profile/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        const userLength = res.data.user.username.length
        if (res.data.user.username.includes('@')) {
          const username = res.data.user.username.substring(0, userLength - 10);
          setUsername(username)
        }
        else {
          const username = res.data.user.username
          setUsername(username)
        }
        setUser(res.data.user); 
        // setUserPicUrl(res.data.user.picture[0].url);
        setWorkouts(res.data.workouts);
        setFollowing(res.data.loggedInUserFollowing);
        setnumFollowing(res.data.numFollowing);
        setnumFollowers(res.data.numFollowers);
        setnumWorkouts(res.data.numWorkouts);
        setnumPosts(res.data.numPosts);
        setPosts(res.data.posts);
        console.log('checking workouts', res.data.savedWorkouts);
        setSavedWorkouts(res.data.savedWorkouts);
        const postIdAndPosition = res.data.posts.map(post => {return ({postId:post._id, index: 0})});
        setPrevSlidePosition(postIdAndPosition);

      } else {
        console.log("no responses");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUser();
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
        const postIdAndPosition = response.data.posts.map(post => {return ({postId:post._id, index: 0})});
        setPrevSlidePosition(postIdAndPosition);
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
    getUser();
  };

  const saveAWorkout = async (workoutId) => {
    "saving workout"
    try { const response = await axios({
      method: "post",
      url: `http://localhost:4000/saveworkout/${workoutId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    if (response) {
      console.log("SAVING WORKOUT", response.data.workout);
      setSavedWorkouts(response.data.saved);
      // setWorkouts(response.data.workout);
    }
    else {
      throw Error("No response");
    }
  }
  catch (e) {
    console.log(e);
  }
  }

  const deleteSavedWorkout = async (workoutId) => {
    console.log("IN DELETE ROUTE SAVE WORKOUT")
    try {
      const response = await axios({
        method: "delete", 
        url: `http://localhost:4000/unsaveworkout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response) {
        setSavedWorkouts((prev) => prev.filter((workout) => workout._id !== response.data.workoutId));
      }
      else {
        throw Error("no response")
      }
    }
    catch (e) {
      console.log(e.message);
    }
  }

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

  const nextSlide = (imglength, postId) => {
      setPrevSlidePosition(prevSlides => {
        return prevSlides.map(slide => {
          if (slide.postId === postId) {
            if (slide.index === imglength-1) {
              return { ...slide, index: 0 };
            }
            else {
              return {...slide, index: slide.index+1}
            }
          } else {
            return slide;
          }
        });
      });
    console.log('next' , prevSlidePosition);
  }

  const prevSlide = (imglength,postId) => {
      setPrevSlidePosition(prevSlides => {
        return prevSlides.map(slide => {
          if (slide.postId === postId) {
            if (slide.index === 0) {
            return { ...slide, index: imglength-1 };
            }
            else {
              return {...slide, index: slide.index-1}
            }
          } else {
            return slide;
          }
        });
      });
    console.log('prev',prevSlidePosition);
  }

  const changeProPic = () => {
    console.log("CHANGE PFP!!!");
  }

  const updatePicture = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (proPic) {
        for (let i = 0; i < proPic.length; i++) {
          formData.append("image", proPic[i]);
        }
      }
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/updateuserpic",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log("update user pic");
        setUserPicUrl(response.data.user.picture[0].url);
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <button onClick={gotoNewsFeed}> Return to feed </button>
      <ProfileMain>
      <button onClick={logout}> Logout </button>

        <TagInfo className="tag">
          <ImageContainer>
            {loggedInId === id ?
            <ProfilePictureForm
             handlePicChange={handlePicChange}
             updatePicture={updatePicture}
             changeProPic={changeProPic}
            /> : <> </>
            }
            <div className="profilepic"> 
                <img src={userPicUrl}></img>
                </div>
            {/* <h3> {userPicUrl} </h3> */}
            <h2> {user.fname} {user.lname} </h2>
          </ImageContainer>
          <UserInformation>
            <UserContact>
              <h3> @ { username }</h3>

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
        </TagInfo>

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

        <TabBar
          //props for WORKOUTS
          handleExerciseForm={handleExerciseForm}
          workoutName={workoutName}
          handleNameChange={handleNameChange}
          toggleAddWorkoutModal ={toggleAddWorkoutModal }
          workouts={workouts}
          loggedInId={loggedInId}
          id={id}
          EditIcon={EditIcon}
          clickEditWorkout={clickEditWorkout}
          deleteWorkout={deleteWorkout}
          activeDropdown={activeDropdown}
          saveAWorkout={saveAWorkout}
  
          workoutId={workoutId}
          savedWorkouts={savedWorkouts} 
          deleteSavedWorkout={deleteSavedWorkout}
          //props for POSTS
          user={user}
          handlePostChange={handlePostChange}
          postForm={postForm}
          posts={posts}
          createPost={createPost}
          handleFileUpload={handleFileUpload}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          deletePost={deletePost}
          prevSlidePosition={prevSlidePosition}
         

        />
      </ProfileMain>

    </div>
  );
}
