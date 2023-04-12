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
    const [exerciseDetails, setExerciseDetails] = useState({})


    const addExercise = (e) => {
        e.preventDefault()
        setworkoutList([...workoutList, exerciseDetails])
        setSelectedExercise('');
        setExerciseDetails('');
    }

    const handleChange = (e) => {
        console.log("selected")
        setSelectedExercise(e.target.value)
        setExerciseDetails({ name: e.target.value, weight: 0, sets: 0, reps: 0, id: e.target.value })
    }

    const changeWeight = (e) => {
        const changeW = workoutList.map((work) => {
            if (work.id === e.target.id) {
                return { ...work, weight: e.target.value }
            }
            return workoutList
        })
        setworkoutList(changeW)
    }

    const changeSet = (e) => {
        const changeS = workoutList.map((work) => {
            if (work.id === e.target.id) {
                return { ...work, sets: e.target.value }
            }
            return workoutList
        })
        setworkoutList(changeS)
    }

    const changeReps = (e) => {
        const changeR = workoutList.map((work) => {
            if (work.id === e.target.id) {
                return { ...work, reps: e.target.value }
            }
            return workoutList
        })
        setworkoutList(changeR)
    }


    const logout = async () => {

        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:4000/logout",

            });
            if (response) {
                setUsername(null)
                navigate("/")
            }
            else {
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
                    <li> {work.name} - weight: <input type="number" id={work.name} value={work.weight} onChange={changeWeight} />
                        sets: <input type="number" id={work.name} value={work.sets} onChange={changeSet} />
                        reps: <input type="number" id={work.name} value={work.reps} onChange={changeReps} />
                    </li>
                ))}
                <button disabled={workoutList.length <= 0}>  Add workout + </button>
            </div>

        </div >
    )
}
