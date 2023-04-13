import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../src/UserContext";

export default function Profile(props) {
  const { workout_list } = props;

  const exercises = [
    "bench press",
    "conventional deadlifts",
    "shoulder presses",
    "barbell squats",
  ];

  const stats = {
    name: "",
    weight: 0,
    reps: 0,
    sets: 0,
  };

  const navigate = useNavigate();

  const { username, setUsername } = useContext(UserContext);
  // const [workoutList, setworkoutList] = useState([]);
  const [exercise, setExercise] = useState(stats);

  const addExercise = async (e) => {
    e.preventDefault();
    try {
      console.log("asdded exercise");
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/createworkout",
        data: {
          name: exercise.name,
          weight: exercise.weight,
          sets: exercise.sets,
          reps: exercise.reps,
        },
      });

      if (response) {
        console.log(response);
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const checkLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:4000/protected",
      });
      if (response) {
        // console.log(response);
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addWorkout = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/createworkout",
        data: {
          name: exercise.name,
          weight: exercise.weight,
          sets: exercise.sets,
          reps: exercise.reps,
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

  const logout = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:4000/logout",
      });
      if (response) {
        setUsername(null);
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
      <h1> Welcome {username} ! </h1>
      <button onClick={logout}> Logout </button>
      <h1> Workouts </h1>
      <form onSubmit={addExercise}>
        <label htmlFor="name"> Select exercise </label>
        <select value={exercise.name} name="name" onChange={handleChange}>
          <option value=""> -- Choose an exercise -- </option>
          {exercises.map((exercise) => (
            <option key={exercise} value={exercise}>
              {" "}
              {exercise}{" "}
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
        <button onClick={checkLogin}> Check Login</button>
      </form>
      <div>
        {workout_list}
        {/* <button disabled={workout_list.length <= 0} onClick={addWorkout}>  Add workout + </button> */}
      </div>
    </div>
  );
}
