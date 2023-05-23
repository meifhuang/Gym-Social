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
        comment.createdBy.push(user);
        post.comments.push(comment);
        await comment.save();
        await post.save();
        const updatedPost = await Post.findById(req.params.postId).populate("comments"); 
        res.status(200).json({
            success: true,
            updatedPost: updatedPost
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

router.delete("/post/:postId/comment/:commentId", async (req, res) => {
    try {
         await Post.findByIdAndUpdate(req.params.postId, {
            $pull: {comments: req.params.commentId}
        });
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        const updatedPost = await Post.findById(req.params.postId).populate("comments");
        if (comment) {
            res.status(200).json({
                success: true,
            })
        }
        else {
            res.status(400).json({
                success: false, 
                message: "unable to find comment"
            })
        }
    }
    catch (e) {
        res.status(400).json({
            success: true, 
            message: "unable to find comment"
    })
    }
}) 

module.exports = router; 