import axios from "axios";

async function getExerciseList() {
  // const exercise_key = import.meta.env.VITE_ExerciseKey;
  // const options = {
  //   method: "GET",
  //   url: "https://exercisedb.p.rapidapi.com/exercises",
  //   headers: {
  //     "Content-Type": "application/octet-stream",
  //     "X-RapidAPI-Key": exercise_key,
  //     "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  //   },
  // };

  // try {
  //   const response = await axios.request(options);
  //   console.log(response.data);
  //   return response.data;
  // } catch (error) {
  //   console.error(error);
  // }
}

export { getExerciseList };
