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
  const user = await User.findById(req.user.id).populate("exercises");
  const workout_list = user.exercises;
  const username = user.username;

  res.status(200).json({
    success: true,
    workout_list: workout_list,
    message: "HELLO",
    username: username,
  });
});

router.post(
  "/createworkout",
  catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    console.log("user logged in is", user);
    const { name, weight, sets, reps } = req.body;
    const exercise = new Exercise({ name, weight, sets, reps });
    user.exercises.push(exercise);
    // workout.creator = req.user._id;
    // workout.exercises.push(exercise);
    await exercise.save();
    await user.save();
    console.log("Added exercise!");

    res.status(200).json({
      success: "true",
      exercises: user.exercises,
    });
  })
);

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
