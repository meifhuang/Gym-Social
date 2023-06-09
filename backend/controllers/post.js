const express = require("express");
const Post = require("../models/post")
const User = require("../models/user");
const mongoose = require("mongoose");
const multer = require('multer');
const {storage} = require('../cloudinary'); 
const upload = multer({storage});
const {cloudinary} = require('../cloudinary');

router = express.Router();

router.get("/getpost/:postId", async (req, res) => {
    try {
        const getpost = await Post.findById(req.params.postId).populate(["comments","createdBy", {path: "comments" , populate: {path: "createdBy"}}]);
        const post = []
        post.push(getpost);
        if (getpost) {
            res.status(200).json({
                success: true,
                post: post
            })
        }
        else {
            res.status(400).json({
                success: false, 
                message: 'cannot find post'
            })
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            message: 'post no work'
        })
    }
})


router.get("/newsfeed/posts", async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate(
            [{path: "following", populate: {path: "posts", populate: {path: "createdBy"}}},
             {path: "following", populate: {path: "posts", populate: {path: "comments"}}}]);
        const following = user.following; 
        const posts = [];
        for (let each of following) {
            for (let post of each.posts) {
                posts.push(post)
            }
        }
       
        res.status(200).json({
            success: true,
            posts: posts
        })
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: 'unable to get posts'
        })
    }
})

router.post("/createpost", upload.array('image'), async (req, res) => {
    try {
    const user = await User.findById(req.user.id).populate([
        {path: "posts", populate: {path: "comments"}},
        {path: "posts", populate: {path: "createdBy"}}]);
    const post = new Post(req.body);

    post.images = req.files.map(file => ({url: file.path, filename: file.filename}));
    post.createdBy.push(user);
    
    if (post) {
    user.posts.push(post); 
    await user.save();
    await post.save();
    res.status(200).json({
        success: true,
        posts: user.posts
    })
}
else {
    res.status(400).json({
        success: false, 
        message: "unable to post"
    })
}}
catch (e) {
    console.log(e.message);
}
})

router.delete("/post/:postId", async (req, res) => {
    const {postId} = req.params

    try {
        const post = await Post.findById(req.params.postId).populate('images');
        const deleteFromUser = await User.findByIdAndUpdate(req.user.id, {
            $pull: { posts: req.params.postId }
        })
        const deletePost = await Post.findByIdAndDelete(postId);
        if (deleteFromUser && deletePost) {
       
        for (let file of post.images) {
            await cloudinary.uploader.destroy(file.filename)
        }
        res.status(200).json({
            success: true,
            postId: postId
        })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Unable to delete"
            })
        }
    }
    catch (e) {
        console.log(e.message);
    } 
})


module.exports = router;