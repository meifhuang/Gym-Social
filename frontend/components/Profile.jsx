import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../src/AuthContext";
// import workout from "../../backend/models/workout";

export default function Profile() {
  const { token, userId } = useContext(AuthContext);

  const [workoutList, setworkoutList] = useState([]);
  const [username, setUsername] = useState("");
  const [showExerciseForm, setShowExerciseForm] = useState(false); 
  const [changeId, setChangeId] = useState("");

  const getWorkout = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:4000/profile",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res) {
        setUsername(res.data.username);
        setworkoutList(res.data.workout);
        // setworkoutList(res.data.workout_list);
      } else {
        console.log("NO RESPONSE");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getWorkout();
  }, []);

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

  const navigate = useNavigate();

  // const { username, setUsername } = useContext(UserContext);
  // const [workoutList, setworkoutList] = useState([]);
  const [exercise, setExercise] = useState(stats);

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
        // const data = await res.data;
        console.log(workoutId);
        setworkoutList([
          ...workoutList,
          {
            name: exercise.name,
            weight: exercise.weight,
            sets: exercise.sets,
            reps: exercise.reps,
          },
        ]);
      } else {
        console.log("NO RES");
      }
    } catch (e) {
      console.log(e.message);
      console.log(e);
    }
  };

  const deleteExercise = async (exerciseId) => {
    console.log("in delete route");
    try {
      const res = await axios({
        method: "delete",
        url: `http://localhost:4000/exercise/${exerciseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        console.log(res.data.exerciseId);
        setworkoutList((prev) =>
          prev.filter((exercise) => {
            return exercise._id !== res.data.exerciseId;
          })
        );
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const editExercise = async (exerciseId) => {
    console.log("in exercise route");
    // console.log(exerciseId);
    console.log(workoutList)
    try {
      const res = await axios({
        method: "put",
        url: `http://localhost:4000/exercise/${exerciseId}`,
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
        const exercise_data = await res.data.finalUpdateExercise

        const updateList = workoutList.map((exercise) => {
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

        setworkoutList(updateList);
      }
    } catch (e) {
      console.log(e.message);
    }
  };


  const [workoutName, setWorkoutName] = useState("")
  const [workoutId, setworkoutId] = useState(0);

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
        console.log(response.data)
        setworkoutId(response.data.workoutId)
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e);
    }

    setShowExerciseForm(true)
  }

  const createWorkout = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/createuserworkout",
        data: {
          name: workoutName, 
          workoutList: workoutList,
          workoutId: workoutId
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log(response);
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e);
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
    const {name, value} = e.target;
    setWorkoutName({
      name: value
    })
    console.log(workoutName);
  }

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
      <h1> Welcome {username}! </h1>
      <button onClick={logout}> Logout </button>
      <h1> Workouts </h1>
      { showExerciseForm ? 
      <>
        <form onSubmit={(e) => addExercise(e)}>
        <label htmlFor="name"> Select exercise </label>
        <select
          value={exercise.name}
          name="name"
          onChange={handleChange}
          required
        >
          <option value=""> -- Choose an exercise -- </option>
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
        />
        <label htmlFor="reps"> Reps </label>
        <input
          type="number"
          value={exercise.reps}
          name="reps"
          onChange={handleChange}
        />
        <label htmlFor="sets"> Sets </label>
        <input
          type="number"
          value={exercise.sets}
          name="sets"
          onChange={handleChange}
        />
        <button disabled={!exercise}> Add exercise + </button>
      </form>
   
       <button onClick={createWorkout}> End workout </button>
       </>
      :  
      <>      
      <form onSubmit={(e) => handleExerciseForm(e)}>
        <label htmlFor="workoutname"> Workout Name </label>
        <input type='text' value={workoutName.name} name="name" onChange={handleNameChange}/>
        <button> Create a workout + </button>      
      </form>
    
      </>

      }
      <button onClick={getWorkout}> get workout </button>
      <div>
        {workoutList.map((work) => {
          if (changeId === work._id) {
            return (
              <>
                <div>EDIT FORM</div>
                <h5>
                  {work.name} - {work.weight} lbs - {work.sets} sets -{" "}
                  {work.reps} - reps {work._id}
                  <button onClick={() => deleteExercise(work._id)}>
                    {" "}
                    delete{" "}
                  </button>
                  {/* <button onClick={() => setChangeId(work._id)}> edit </button> */}
                  <button onClick={() => editExercise(work._id)}>
                    {" "}
                    complete{" "}
                  </button>
                </h5>
              </>
            );
          } else {
            return (
              <h5>
                {work.name} - {work.weight} lbs - {work.sets} sets - {work.reps}{" "}
                - reps {work._id}
                <button onClick={() => deleteExercise(work._id)}>
                  {" "}
                  delete{" "}
                </button>
                <button
                  onClick={() => {
                    
                    setChangeId(work._id);
                    console.log(changeId)
                  }}
                >
                  {" "}
                  edit{" "}
                </button>
              </h5>
            );
          }
        })}
      </div>
    </div>
  );
}
