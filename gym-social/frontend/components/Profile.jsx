import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from '../src/UserContext'


export default function Profile(props) {

    const exercises = ["bench press", "conventional deadlifts", "shoulder presses", "barbell squats"]

    const navigate = useNavigate();

    const { username, setUsername } = useContext(UserContext);
    const [workoutList, setworkoutList] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');

    const addExercise = (e) => {
        e.preventDefault()
        setworkoutList([...workoutList, selectedExercise])
        setSelectedExercise('');
    }

    const handleChange = (e) => {
        console.log("selected")
        setSelectedExercise(e.target.value)
    }

    const logout = async () => {

        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:4000/logout",

            });
            if (response) {
                setUsername(null)
                return navigate("/")
            }
            else {
                navigate('/')
                throw Error('no response')
            }
        }
        catch (e) {
            console.log(e)
        }
    }



    return (
        <div className="App">
            <h1> Welcome {username} ! </h1>
            <button onClick={logout}> Logout </button>
            <h1> Workouts </h1>
            <form onSubmit={addExercise}>
                <label htmlFor="workouts"> Select exercise </label>
                <select value={selectedExercise} onChange={handleChange} id="workouts">
                    <option value=""> -- Choose an exercise -- </option>
                    {exercises.map((exercise) => (
                        <option key={exercise} value={exercise} > {exercise} </option>
                    ))}
                </select>
                <button disabled={!selectedExercise}> Add exercise + </button>
            </form>
            <div>
                {workoutList.map((work) => (
                    <li> {work} </li>))
                }
            </div>

        </div>
    )
}
