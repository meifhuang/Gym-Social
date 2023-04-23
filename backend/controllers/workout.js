const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const User = require("../models/user");

router = express.Router();

const isLoggedIn = function (req, res, next) {
  if (!request.user) {
    response.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  } else {
    next();
  }
};

router.get("/profile", async (req, res) => {
  console.log("accessing profile route");
  const user = await User.findById(req.user.id).populate("workouts");
  // const workout_list = user.exercises;
  const workout = user.workouts; 
  const username = user.username;

  res.status(200).json({
    success: true,
    // workout_list: workout_list,
    workout: workout,
    message: "HELLO",
    username: username,
  });
});


//when i add an exercise - must find the workout its attached to
// ok : click create exercise and it adds to workout for now .. need to fix Front end so that it'll display that
//particular workout..
//ok cant think aynmore but - ^ how to create exercises + link it to workout schema without adding it to users yet?

router.post(
  "/workout/:id/createexercise",
  async (req, res) => {
    const user = await User.findById(req.user.id).populate('workouts');
    const { name, weight, sets, reps } = req.body;
    const exercise = new Exercise({ name, weight, sets, reps });
    // user.workouts.push(exercise);

    await exercise.save();
    // await user.save();
    console.log("Added exercise!");

    res.status(200).json({
      success: "true",
      // exercises: user.exercises,
      workout: user.workouts
    });
  });

  router.post(
    "/createworkout",
    async (req, res) => {
      const user = await User.findById(req.user.id).populate('workouts');
      const { name, workoutList } = req.body;
      console.log(workoutList)
      const workout = new Workout({ name });
      for (let each of workoutList) {
        const exercise = new Exercise(each)
        workout.exercises.push(exercise)
      }
      user.workouts.push(workout);
      await user.save();
      await workout.save();
      console.log("Added workout!");
      res.status(200).json({
        success: "true",
        workouts: user.workouts,
      });
});



router.delete("/exercise/:exerciseId", async (req, res) => {
  console.log("entering delete");
  const userId = await User.findById(req.user.id);
  const { exerciseId } = req.params;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { exercises: exerciseId } });
    const deleteExercise = await Exercise.findByIdAndDelete(exerciseId);

    if (deleteExercise) {
      res.status(200).json({
        success: true,
        exerciseId: exerciseId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to delete",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.put("/exercise/:exerciseId", async (req, res) => {
  console.log(req.body, "UPDATE ROUTE");
  const userId = await User.findById(req.user.id);
  const { exerciseId } = req.params;
  try {
    // const user = await User.findByIdAndUpdate(userId, { $pull: { exercises: exerciseId } });
    const updateExercise = await Exercise.findOneAndUpdate(
      { _id: { $in: exerciseId } },
      {
        name: req.body.name,
        reps: parseInt(req.body.reps),
        sets: parseInt(req.body.sets),
        weight: parseInt(req.body.weight),
      }
    );

    const finalUpdateExercise = await Exercise.findOne({
      _id: { $in: exerciseId },
    });
    console.log(finalUpdateExercise, "UPDATED EXERCISE");
    if (updateExercise) {
      res.status(200).json({
        success: true,
        finalUpdateExercise
        // user
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to update",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// router.get("/getexercises", async (request, response) => {
//   try {
//     const allExercises = await
//   } catch (e) {

//   }
// })

module.exports = router;
