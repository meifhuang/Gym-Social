const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    url: {
        type: String,
    },
    createdAt: {
        type: Date, default: Date.now
    },
    caption: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Post', PostSchema);
