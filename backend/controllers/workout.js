const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const mongoose = require("mongoose");

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

//NOTE ISSUE : if in the middle of adding exercises .. it doensn't add and link to users unless
//the End workout button is pressed ... but it addes the exercises and workout to database..

// router.get("/workout/:workoutId", async (req, res) => {
//   console.log("entering edit workout");
//   const { workoutId } = req.params;
//   try {
//     const workout = await Workout.findById(workoutId).populate("exercises");
//     // const workout = await User.findOne({'workouts._id': workoutId}).populate("exercises");
//     if (workout) {
//       console.log("getting workout", workout);
//       res.status(200).json({
//         success: true,
//         workout: workout,
//         // workouts: workout.exercises,
//         // workoutId: workoutId
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "Unable to get workout",
//       });
//     }
//   } catch (e) {
//     console.log(e.message);
//   }
// });

router.delete("/workout/:workoutId", async (req, res) => {
  console.log("entering delete");
  const userId = await User.findById(req.user.id);
  const { workoutId } = req.params;

  try {
    const selectedWorkout = await Workout.findById(workoutId).populate(
      "exercises"
    );
    if (selectedWorkout) {
      for (let each of selectedWorkout.exercises) {
        await Exercise.findByIdAndDelete(each._id);
      }
      const deleteWorkout = await Workout.findByIdAndDelete(workoutId);
      console.log("delete workout", deleteWorkout);
      const deletefromUser = await User.findByIdAndUpdate(userId, {
        $pull: { workouts: workoutId },
      });
      console.log(deletefromUser);
      res.status(200).json({
        success: true,
        workoutId: workoutId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to delete",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});



//this happens after clicking create workout and setting a name

router.post("/createworkout", async (req, res) => {
  console.log("create wrkout");

  const user = await User.findById(req.user.id).populate("workouts");
  const { name } = req.body;
  const workout = new Workout(name);
  const workoutId = workout._id;
  await user.save();
  await workout.save();
  console.log("Added workout!");
  res.status(200).json({
    success: "true",
    workouts: user.workouts,
    workoutId: workoutId,
  });
});

//this happens after finishing creating the rest of the workout and add exercises

router.post("/createuserworkout", async (req, res) => {
  console.log(req.body);
  const { name, workoutId } = req.body;
  const user = await User.findById(req.user.id).populate({
    path: "workouts",
    populate: { path: "exercises" },
  });
  const workout = await Workout.findById(workoutId).populate("exercises");
  console.log(workout);
  const workouts = user.workouts;

  workouts.push(workout);
  await user.save();
  // await workout.save();
  console.log("Added workout!");
  res.status(200).json({
    success: "true",
    workouts: workouts,
  });
});


module.exports = router;
