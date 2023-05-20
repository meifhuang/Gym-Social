const express = require("express");
const Post = require("../models/post")
const User = require("../models/user");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

router = express.Router();

router.post("/post/:postId/createcomment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate("comments");
        const comment = new Comment(req.body);
        const user = await User.findById(req.user.id);
        console.log(user.username);
        console.log(comment);
        const userLength = user.username.length;
        let username = ""; 
        if (user.username.includes('@')) {
          username = user.username.substring(0, userLength - 10);
        }
        else {
            username = user.username
        }
        comment.username = username;
        post.comments.push(comment);
        await comment.save();
        await post.save();
        res.status(200).json({
            success: true,
            comment: comment
        })
    }
    catch (e) {
        console.log(e.message);
        res.status(400).json({
            success: false,
            message: "unable to create comment"
        })
    }
})

module.exports = router; 