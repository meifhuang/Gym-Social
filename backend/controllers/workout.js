const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const user = require("../models/user");
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

router.get("/profile", async (req, res) => {
  console.log("accessing profile route");
  const user = await User.findById(req.user.id).populate({path: 'workouts', populate: { path: "exercises" }});
  // const workout_list = user.exercises;
  const workouts = user.workouts; 
  console.log(user);
  // console.log(workouts[0].exercises[0].name);
  const username = user.username;
  res.status(200).json({
    success: true,
    // workout_list: workout_list,
    workouts: workouts, 
    message: "HELLO",
    username: username,
  });
});


router.get("/workout/:workoutId", async (req, res) => {
  console.log("entering edit workout");
  const {workoutId} = req.params;
  try { 
    const workout = await Workout.findById(workoutId).populate("exercises");
    // const workout = await User.findOne({'workouts._id': workoutId}).populate("exercises");
    if (workout) {
    console.log("getting workout", workout);
    res.status(200).json({
      success: true, 
      workouts: workout.exercises,
      workoutId: workoutId
    })
  }
  else {
    res.status(400).json({
      success: false,
      message: "Unable to get workout",
  })
}
  }
  catch (e) {
    console.log(e.message);
  }
})


router.delete("/workout/:workoutId" , async (req, res) => {
  console.log("entering delete");
  const userId = await User.findById(req.user.id);
  const {workoutId} = req.params;

  try {
      const selectedWorkout = await Workout.findById(workoutId).populate("exercises"); 
      if (selectedWorkout) {
        for (let each of selectedWorkout.exercises) {
          await Exercise.findByIdAndDelete(each._id);
          console.log("deleted", each._id)
        }
      const deleteWorkout = await Workout.findByIdAndDelete(workoutId);
      console.log('delete workout', deleteWorkout); 
      const deletefromUser = await User.findByIdAndUpdate(userId, {$pull: {workouts: workoutId}});
      console.log(deletefromUser);
        res.status(200).json({
                success: true,
                workoutId: workoutId
          })
      }
      else {
        res.status(400).json({
                success: false,
                message: "Unable to delete",
          });
      } 
  }
     catch (e) {
        console.log(e.message);
      }
    })


//this doesn't delete it in users though yet 
router.delete("/workout/:workoutId/exercise/:exerciseId", async (req, res) => {
  console.log("entering delete exercise");
  const { workoutId, exerciseId } = req.params;
  try {
    await Workout.findByIdAndUpdate(workoutId, { $pull: { exercises: exerciseId } });
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


// router.delete("/workout/:workoutId/exercise/:exerciseId", async (req, res) => {
//   console.log("entering delete");
//   const userId = await User.findById(req.user.id);
//   const { exerciseId } = req.params;
//   try {
//     await User.findByIdAndUpdate(userId, { $pull: { exercises: exerciseId } });
//     const deleteExercise = await Exercise.findByIdAndDelete(exerciseId);

//     if (deleteExercise) {
//       res.status(200).json({
//         success: true,
//         exerciseId: exerciseId,
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "Unable to delete",
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(400).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// });

//this happens after clicking create workout and setting a name

router.post(
  "/createworkout",
  async (req, res) => {
    console.log("create wrkout")
    console.log(req.body);

    const user = await User.findById(req.user.id).populate('workouts');
    const { name } = req.body;
    const workout = new Workout(name);
    const workoutId = workout._id; 
    await user.save();
    await workout.save();
    console.log("Added workout!");
    res.status(200).json({
      success: "true",
      workouts: user.workouts,
      workoutId: workoutId
    });
});

//this happens after finishing creating the rest of the workout and add exercises

router.post(
    "/createuserworkout",
    async (req, res) => {
      const {name, workoutId} = req.body
      const user = await User.findById(req.user.id).populate({path: 'workouts', populate: { path: "exercises" }});
      const workout = await Workout.findById(workoutId).populate('exercises');
      const workouts = user.workouts; 
      console.log("this is the pre", user);
      console.log("this is the workout to be added", workout);
      workouts.push(workout);
      await user.save();
      // await workout.save();
      console.log("this is the user", user)
      console.log("Added workout!");
      res.status(200).json({
        success: "true",
        workouts: workouts,
      });
  });

//create an exercise (automatically also adds its to the workout schema 

router.put("/workout/:id/createexercise", async (req, res) => {
  console.log("UPDATE - add exercise to particular workout");
  const { name, weight, sets, reps } = req.body;
  try {
  const workout = await Workout.findById(req.params.id).populate("exercises");
  console.log(workout.exercises);
  if (workout) {
    const exercise = new Exercise({ name, weight, sets, reps });
    await exercise.save(); 
    workout.exercises.push(exercise);
    await workout.save();
    console.log(workout);
    res.status(200).json({
      success: "true",
      workout: workout.exercises,
      exercise: exercise
    })
  }
  // user.workouts.push(workout); 
  else {
    console.log("unable to add to workout")
    res.status(400).json({
      success: "false",
      message: "Something went wrong",
     
    })
  }}
  catch (e) {
    console.log(e.message);
  }
})

router.put("/exercise/:exerciseId", async (req, res) => {
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
