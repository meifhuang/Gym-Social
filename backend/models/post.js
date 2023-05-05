const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
})


const PostSchema = new Schema({
    images:[ImageSchema],
    createdAt: {
        type: Date, default: Date.now
    },
    caption: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Post', PostSchema);
