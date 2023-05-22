const express = require("express");
const passport = require("passport");
const Workout = require("../models/workout");
const Post = require("../models/post");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const Image = require("../models/user");
const mongoose = require("mongoose");
const multer = require('multer');
const {storage} = require('../cloudinary'); 
const upload = multer({storage});
const {cloudinary} = require('../cloudinary');

router = express.Router();

//**When deleting a user - have to delete their posts and workouts as well */

router.get("/profile/:id", async (req, res) => {
  console.log("accessing profile route");
  const loggedInId = req.user.id;
  const paramId = req.params.id;
  const user = await User.findById(paramId).populate([
    {path: "workouts", populate: { path: "exercises" }},
   {path: "saved", populate: { path: "exercises"}},
   {path: "saved", populate: {path: "createdBy"}}, 
   {path: "posts", populate: {path: "comments"}},
   {path: "posts", populate: {path: "createdBy"}}]);
  const loggedInUser = await User.findById(loggedInId).populate([{path: "saved", populate: { path: "exercises" }} , "following", "followers", "posts"]);
  const workouts = user.workouts
  const numWorkouts = user.workouts.length;
  const numFollowing = user.following.length;
  const numFollowers = user.followers.length; 
  const numPosts = user.posts.length;

  res.status(200).json({
    success: true,
    workouts: workouts,
    numFollowing: numFollowing, 
    numFollowers: numFollowers,
    numWorkouts: numWorkouts,
    numPosts: numPosts,
    user: user,
    savedWorkouts: user.saved,
    posts: user.posts,
    loggedInId: loggedInId,
    loggedInUserFollowing: loggedInUser.following,
  });
});

router.get("/newsfeed", async (req, res) => {
  console.log("accessing users ");
  const id = req.user.id;
  try {
    //find all users that are not yourself ...
    const users = await User.find({ _id: { $not: { $eq: id } } }).populate({
      path: "following",
    });
    //get a list of followers
    const yourself = await User.findById(req.user.id).populate("following");
    if (yourself) {
      res.status(200).json({
        success: true,
        users: users,
        following: yourself.following,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldnt get followers",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/profile/:id/follow", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("following");
    const userToFollow = await User.findById(req.params.id).populate(
      "followers"
    );
  
    const isalreadyFollowing = await User.find({
      _id: req.user.id,
      following: { _id: userToFollow._id },
    });
    if (isalreadyFollowing.length === 0) {
      user.following.push(userToFollow);
      userToFollow.followers.push(user);
      await user.save();
      await userToFollow.save();
    
    } else {
      console.log("coudlnt follow probably cause already following");
    }
    res.status(200).json({
      success: "true",
      following: user.following,
    });
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/profile/:id/unfollow", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { following: req.params.id },
    });
    const userUpdated = await User.findById(req.user.id).populate("following");
    const userToUnfollow = await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.user.id },
    });
    const userToUnfollowUpdated = await User.findById(req.user.id).populate(
      "followers"
    );
  
    if (userUpdated && userToUnfollowUpdated) {
      res.status(200).json({
        success: "true",
        userfollowing: userUpdated.following,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/explore", async (req, res) => {
  console.log("explore");
  const id = req.user.id;
  try {
    //find all users that are not yourself ...
    const users = await User.find({ _id: { $not: { $eq: id } } }).populate({
      path: "following",
    });
    //get list of followers
    const yourself = await User.findById(req.user.id).populate("following");
    if (yourself && users) {
      res.status(200).json({
        success: true,
        users: users,
        following: yourself.following,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldnt get followers",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/likepost/:postId", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.postId).populate("likedBy");
    const isalreadyLiked = await Post.find({_id: req.params.postId, likedBy: {_id: req.user.id}});
    
    console.log(isalreadyLiked);
    if (post) {
      if (isalreadyLiked.length === 0) {
        post.likedBy.push(user); 
        await post.save(); 
        console.log("LIKING POST");
        res.status(200).json({
          success: true,
          message: 'like post'
        })
      }
      else {
        res.status(400).json({
          success: false,
          message: 'unable to like'
        })
      }
    }
  }
  catch(e) {
    console.log(e.message);
  }
})

router.delete("/unlikepost/:postId", async (req, res) => {
    try {
      const unlikePost = await Post.findByIdAndUpdate(req.params.postId, {$pull: {likedBy: req.user.id}});
      if (unlikePost) {
        res.status(200).json({
          success: true,
          message: "unliked!"
        })
      }
      else {
        res.status(400).json({
          success: false, 
          message: "couldnt unlike"
        })
      }
    }
    catch (e) {
      console.log(e.message);
    }
})


router.post("/saveworkout/:workoutId", async (req, res ) => {
  try { 
      const user = await User.findById(req.user.id).populate({path: "saved", populate: { path: "exercises" }})
      const workout = await Workout.findById(req.params.workoutId).populate(["exercises",  "savedBy"]);
      const isalreadySaved = await User.find({_id: req.user.id, saved: {_id: req.params.workoutId}});

      if (user && workout) {
        // console.log(workout);
        //if workout already saved ... 
        if (isalreadySaved.length === 0) {
            user.saved.push(workout);
            workout.savedBy.push(user);
            await workout.save(); 
            await user.save();
            res.status(200).json({
              success: true, 
              saved: user.saved
            })
        }
      else {
        res.status(400).json({
          success:false, 
          message: 'couldnt save workout'
        })
      }
    }
  }
  catch (e) {
      console.log(e.message);
    }
  })

router.delete("/unsaveworkout/:workoutId", async (req, res) => {
  try {
    const unsave = await User.findByIdAndUpdate(req.user.id, {$pull: {saved: req.params.workoutId}})
    const workout = await Workout.findByIdAndUpdate(req.params.workoutId, {$pull: {savedBy: req.user.id}});
    const user = await User.findById(req.user.id).populate({path: "saved", populate: { path: "exercises" }});

    if (unsave && workout) {   
      res.status(200).json({
        success: true,
        workoutId: req.params.workoutId
      })
    }
    else {
      res.status(400).json({
        success: false, 
        message: 'coudlnt delete'
      })
    }
  }
  catch (e) {
    console.log(e.message);
  }
})

router.post("/updateuserpic", upload.single('image'), async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate("picture");
      // console.log('in updatepic route', user.profilepic);
      if (user) { 
      user.picture.pop();
      const newImage = {url: req.file.path, filename: req.file.filename};
      console.log(newImage); 
      user.picture.push(newImage);
      await user.save();
      res.status(200).json({
        user: user
      })
      }
      else {
        res.status(400).json({
          success: false,
          message: "couldnt find user",
       
        });
      }
      // console.log(user); 
    }
    catch (e) {
      console.log(e.message);
    }
})



module.exports = router;
