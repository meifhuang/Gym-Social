import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
// import workout from "../../backend/models/workout";
import exerciseDB from "../loader/exerciseDB";

//component
// import ModalComp from "../components/Modal";
import AddWorkoutForm from "../components/AddWorkoutForm";
import EditWorkoutForm from "../components/EditWorkoutForm";
import EditProfileForm from "../components/EditProfileForm";
import TabBar from "../components/TabBar";

import {
  EditIcon,
  DeleteIcon,
  GridIcon,
  WorkoutIcon,
  FavoriteIcon,
  EditProfileIcon,
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
  PostContainer,
  Modal,
  ModalOverlay,
} from "../styledComponents/Profile";

export default function Profile() {
  const BASE_URL = import.meta.env.VITE_URL;
  // const exerciseDB = useLoaderData();
  // const exerciseDB = exerciseDB; 

  const { id } = useParams();
  const { token, userId, userPicUrl, setUserPicUrl } = useContext(AuthContext);
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
  // const [userPicUrl, setUserPicUrl] = useState("");
  const [profileUserUrl, setprofileUserUrl] = useState("")

  //forms
  const [showExerciseForm, setShowExerciseForm] = useState(true);
  const [postForm, setPostForm] = useState({ caption: "" });
  const [commentForm, setCommentForm] = useState({ description: "" });
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

  const [errorMessage, setErrorMessage] = useState("");


  const [activeDropdown, setActiveDropdown] = useState("");

  const [posts, setPosts] = useState([]);
  const [postLikes, setPostLikes] = useState(0);

  const [files, setFiles] = useState(null);
  const [proPic, setProPic] = useState(null);
  const [prevSlidePosition, setPrevSlidePosition] = useState({});
  const [profileInfoModal, setProfileInfoModal] = useState(false);
  const prof = { username: "", bio: "" };
  const [profileInfo, setProfileInfo] = useState(prof);
  // const [exerciseDB, setExerciseDB] = useState([])
  const [showAddPostModal, setShowAddPostModal] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise({
      ...exercise,
      [name]: value,
    });
  };

  const handleSelection = (e) => {
    setExercise({
      ...exercise,
      name: e.value
    })
  }

  const handleEditSelection = (e) => {
    setEditedExercise({
      ...editedExercise,
      name: e.value
    })
  }

  const toggleShowAddPostModal = () => {
    setShowAddPostModal(!showAddPostModal);
    setPostForm({...postForm, caption: ""})

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
   
  };

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostForm({
      [name]: value,
    });
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm({
      description: value,
    });
    
  };

  const handleFileUpload = (e) => {
    setFiles([...e.target.files]);
  };

  const handlePicChange = (e) => {
    setProPic([...e.target.files]);
  };

  const handleProfileInfoChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
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

  const getNav = async (userid) => {
    try { 
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/profile/${userid}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    if (res) {
      setUserPicUrl(res.data.user.picture[0].url);
    }
  }
  catch (e) {
    console.log(e.message)
  }
}

  const getUser = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/profile/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        const userLength = res.data.user.username.length;
        if (res.data.user.username.includes("@")) {
          const username = res.data.user.username.substring(0, userLength - 10);
          setUsername(username);
          setProfileInfo({
            ...profileInfo,
            username: username,
            bio: res.data.user.bio,
          });
        } else {
          const username = res.data.user.username;
          setUsername(username);
        }
        setUser(res.data.user);
        setprofileUserUrl(res.data.user.picture[0].url)
        setWorkouts(res.data.workouts);
        setFollowing(res.data.loggedInUserFollowing);
        setnumFollowing(res.data.numFollowing);
        setnumFollowers(res.data.numFollowers);
        setnumWorkouts(res.data.numWorkouts);
        setnumPosts(res.data.numPosts);
        setPosts(res.data.posts);
        setPostLikes(res.data.postLikes);
        setSavedWorkouts(res.data.savedWorkouts);
        const postIdAndPosition = res.data.posts.map((post) => {
          return { postId: post._id, index: 0 };
        });
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
    let userid = localStorage.getItem("id")
    getNav(id);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
   
    const token = urlParams.get("token");
    const userId = urlParams.get("userId");
    if (token && userId) {
     
      localStorage.setItem("token", token);
      localStorage.setItem("id", userId);
      let userid = localStorage.getItem("id");
      print(`THIS THE USERID, ${userid}`);
      window.location.replace(`/profile/${userId}`);
      // getUser();
    } else {
      console.log("No token");
    }
    // navigate("/newsfeed");
    // window.location.replace(`/newsfeed`);
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

      const response = await axios({
        method: "post",
        url: `${BASE_URL}/createpost`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        setPosts(response.data.posts);
        const postIdAndPosition = response.data.posts.map((post) => {
          return { postId: post._id, index: 0 };
        });
        setPrevSlidePosition(postIdAndPosition);
        setnumPosts((prev) => prev + 1);
        toggleShowAddPostModal()
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createComment = async (e, postId) => {
    e.preventDefault();
  
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/post/${postId}/createcomment`,
        data: {
          description: commentForm.description,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        //gotta figure out better way
        getUser();
      } else {
        console.log("no response");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  //still need the page to update when a comment is added

  const createWorkout = async () => {
    setAddWorkoutModal(false);
  
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/createuserworkout`,
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
        toggleAddWorkoutModal()
        setWorkoutName({...workoutName, name: ''})
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

  const likeAPost = async (postId) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/likepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
       
        getUser();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const saveAWorkout = async (workoutId) => {
    "saving workout";
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/saveworkout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
      
        setSavedWorkouts(response.data.saved);
        //figure out another way to update saved/unsaved without needing to call this function
        getUser();
        // setWorkouts(response.data.workout);
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteSavedWorkout = async (workoutId) => {
   
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL}/unsaveworkout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        setSavedWorkouts((prev) =>
          prev.filter((workout) => workout._id !== response.data.workoutId)
        );
        //figure out another way to update saved/unsaved without needing to call this function
        getUser();
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const unlikeAPost = async (postId) => {
  
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL}/unlikepost/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
       
        getUser();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const clickEditWorkout = async (workoutId) => {
    // setWorkoutName()
    setEditWorkoutModal(true);
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}/workout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        
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
        url: `${BASE_URL}/workout/${workoutId}`,
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

  const deleteComment = async (postId, commentId) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL}/post/${postId}/comment/${commentId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        getUser();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${BASE_URL}/post/${postId}`,
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

    // const exerciseGif = exerciseDB.find(
    //   (exerciseDB_exercise) => exerciseDB_exercise.name === exercise.name
    // ).gifUrl;
  
    try {
      const res = await axios({
        method: "put",
        url: `${BASE_URL}/workout/${workoutId}/createexercise`,
        data: {
          name: exercise.name,
          weight: exercise.weight,
          sets: exercise.sets,
          reps: exercise.reps,
          // gif: exerciseGif,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res) {
  
        setCurrentWorkout([
          ...currentWorkout,
          {
            _id: res.data.exercise._id,
            name: exercise.name,
            weight: exercise.weight,
            sets: exercise.sets,
            reps: exercise.reps,
            // gif: exerciseGif,
          },
        ]);
        setExercise({...exercise, weight: 0, sets: 0, reps: 0})
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
        url: `${BASE_URL}/createworkout`,
        data: {
          name: workoutName,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
       
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

  const editExercise = async (e, exerciseId) => {
    e.preventDefault();

    // console.log(editedExercise.name);

    // const exerciseGif = await exerciseDB.find(
    //   (exerciseDB_exercise) => editedExercise.name === exerciseDB_exercise.name
    // ).gifUrl;
    // console.log(editedExercise.name, exerciseGif);
    // console.log("in exercise route");
    try {
      const res = await axios({
        method: "put",
        url: `${BASE_URL}/workout/${workoutId}/exercise/${exerciseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          name: editedExercise.name,
          weight: editedExercise.weight,
          sets: editedExercise.sets,
          reps: editedExercise.reps,
          // gif: exerciseGif,
        },
      });

      if (res) {
        const exercise_data = await res.data.finalUpdateExercise;

        const updateList = [...currentWorkout].map((exercise) => {
          if (exercise._id === exerciseId) {
           
            return {
              _id: exerciseId,
              name: exercise_data.name,
              weight: exercise_data.weight,
              sets: exercise_data.sets,
              reps: exercise_data.reps,
              // gif: exerciseGif,
            };
          } else {
          
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
      setEditExerciseMode({...editedExercise, weight: 0, reps: 0, sets: 0})

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

    try {
      const res = await axios({
        method: "delete",
        url: `${BASE_URL}/workout/${workoutId}/exercise/${exerciseId}`,
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
      
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const clickEditExercise = async (exerciseId) => {
    
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}/exercise/${exerciseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
     
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
        url: `${BASE_URL}/profile/${id}/follow`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          id: id,
        },
      });
      if (res) {
      
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

    try {
      const res = await axios({
        method: "delete",
        url: `${BASE_URL}/profile/${id}/unfollow`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        
        setFollowing(res.data.userfollowing);
        setnumFollowers((prev) => prev - 1);
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const nextSlide = (imglength, postId) => {
    setPrevSlidePosition((prevSlides) => {
      return prevSlides.map((slide) => {
        if (slide.postId === postId) {
          if (slide.index === imglength - 1) {
            return { ...slide, index: 0 };
          } else {
            return { ...slide, index: slide.index + 1 };
          }
        } else {
          return slide;
        }
      });
    });

  };

  const prevSlide = (imglength, postId) => {
    setPrevSlidePosition((prevSlides) => {
      return prevSlides.map((slide) => {
        if (slide.postId === postId) {
          if (slide.index === 0) {
            return { ...slide, index: imglength - 1 };
          } else {
            return { ...slide, index: slide.index - 1 };
          }
        } else {
          return slide;
        }
      });
    });
   
  };

  const toggleProfileInfo = () => {
    setProfileInfoModal(!profileInfoModal);
  };

  const updatePicture = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (proPic) {
        for (let i = 0; i < proPic.length; i++) {
          formData.append("image", proPic[i]);
        }
      }
      formData.append("bio", profileInfo.bio);
      formData.append("username", profileInfo.username);

      const response = await axios({
        method: "post",
        url: `${BASE_URL}/updateuserpic`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
      
        setUserPicUrl(response.data.user.picture[0].url);
        getUser();
        toggleProfileInfo(!profileInfoModal);
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
  }



  return (
    <div className="App">
      <ProfileMain>
        <TagInfo className="tag">
          <ImageContainer>
            <div className="profilepic">
              <img src={profileUserUrl}></img>
            </div>
            <h2>
              {" "}
              {user.fname} {user.lname}{" "}
            </h2>
          </ImageContainer>
          <UserInformation>
            <UserContact>
              <h3> @ {username}</h3>
              {/* <div className="edit-profile-icon"> */}
              {loggedInId === id ? (
                <div onClick={toggleProfileInfo}>
                  {" "}
                  <div className="edit-profile-icon">
                    {" "}
                    <EditProfileIcon />{" "}
                  </div>
                </div>
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
              {/* </div> */}
            </UserContact>
            <UserStats>
              <div>
                {" "}
                <span>{numPosts}</span> Posts{" "}
              </div>
              <div>
                {" "}
                <span>{numWorkouts}</span> Workouts{" "}
              </div>
              <div>
                {" "}
                <span>{numFollowers}</span> Followers{" "}
              </div>
              <div>
                {" "}
                <span>{numFollowing}</span> Following{" "}
              </div>
            </UserStats>
            <About>
              {/* <div className="about-header">About Me</div> */}
              <div>{user.bio}</div>
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
            handleSelection={handleSelection}
            handleEditSelection={handleEditSelection}
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
            handleSelection={handleSelection}
            handleEditSelection={handleEditSelection}
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
        {profileInfoModal && (
          <Modal>
            <ModalOverlay onClick={toggleProfileInfo}> </ModalOverlay>
            <div className="modal-content">
              <EditProfileForm
                handlePicChange={handlePicChange}
                updatePicture={updatePicture}
                profileInfo={profileInfo}
                handleProfileInfoChange={handleProfileInfoChange}
                setProPic={setProPic}
                userPicUrl={userPicUrl}
              />
            </div>
          </Modal>
        )}

        <TabBar
          //props for WORKOUTS
          username={username}
          handleExerciseForm={handleExerciseForm}
          workoutName={workoutName}
          handleNameChange={handleNameChange}
          toggleAddWorkoutModal={toggleAddWorkoutModal}
          workouts={workouts}
          loggedInId={loggedInId}
          id={id}
          EditIcon={EditIcon}
          clickEditWorkout={clickEditWorkout}
          deleteWorkout={deleteWorkout}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          saveAWorkout={saveAWorkout}
          workoutId={workoutId}
          savedWorkouts={savedWorkouts}
          deleteSavedWorkout={deleteSavedWorkout}
          //props for POSTS
          user={user}
          handlePostChange={handlePostChange}
          postForm={postForm}
          posts={posts}
          postLikes={postLikes}
          unlikeAPost={unlikeAPost}
          likeAPost={likeAPost}
          createPost={createPost}
          handleFileUpload={handleFileUpload}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          deletePost={deletePost}
          prevSlidePosition={prevSlidePosition}
          commentForm={commentForm}
          createComment={createComment}
          deleteComment={deleteComment}
          setPrevSlidePosition={setPrevSlidePosition}
          setFiles={setFiles}
          showAddPostModal={showAddPostModal}
          toggleShowAddPostModal={toggleShowAddPostModal}
        />
      </ProfileMain>
    </div>
  );
}
