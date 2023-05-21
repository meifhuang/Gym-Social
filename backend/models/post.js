const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

const PostSchema = new Schema({
    images:[ImageSchema],
    createdAt: {
        type: Date, default: Date.now
    },
    caption: {
        type: String, 
        required: true
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }], 
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    creaetdBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }], 
})

module.exports = mongoose.model('Post', PostSchema);
