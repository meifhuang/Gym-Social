const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const mongoose = require("mongoose");



//create an exercise (automatically also adds its to the workout schema

router.put("/workout/:id/createexercise", async (req, res) => {
 
    const { name, weight, sets, reps, gif } = req.body;
    try {
      const workout = await Workout.findById(req.params.id).populate("exercises");
  
      if (workout) {
        const exercise = new Exercise({ name, weight, sets, reps, gif });
        await exercise.save();
        workout.exercises.push(exercise);
        await workout.save();
        res.status(200).json({
          success: "true",
          workout: workout.exercises,
          exercise: exercise,
        });
      } else {
        res.status(400).json({
          success: "false",
          message: "Something went wrong",
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  });
  


router.get("/exercise/:exerciseId", async (req, res) => {
    const userId = await User.findById(req.user.id);
    const { exerciseId } = req.params;
    try {
      const exercise = await Exercise.findById(exerciseId);
      if (exercise) {
        res.status(200).json({
          success: true,
          exercise: exercise,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Unable to get exercise",
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
  

  router.put("/workout/:workoutId/exercise/:exerciseId", async (req, res) => {
   
    const { exerciseId, workoutId } = req.params;
  
    try {
      const updateExercise = await Exercise.findOneAndUpdate(
        { _id: { $in: exerciseId } },
        {
          name: req.body.name,
          reps: parseInt(req.body.reps),
          sets: parseInt(req.body.sets),
          weight: parseInt(req.body.weight),
          gif: req.body.gif
        }
      );
  
      const finalUpdateExercise = await Exercise.findOne({
        _id: { $in: exerciseId },
      });
  
      const updatedWorkouts = await Workout.findById(workoutId).populate(
        "exercises"
      );
  
      if (updateExercise) {
        res.status(200).json({
          success: true,
          finalUpdateExercise,
          updatedWorkouts,
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

  router.delete("/workout/:workoutId/exercise/:exerciseId", async (req, res) => {
    const { workoutId, exerciseId } = req.params;
    try {
      await Workout.findByIdAndUpdate(workoutId, {
        $pull: { exercises: exerciseId },
      });
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
  
  module.exports = router;
