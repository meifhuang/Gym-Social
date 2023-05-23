const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    createdBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }], 
    createdAt: {
        type: Date, default: Date.now
    },
})

module.exports = mongoose.model("Comment", CommentSchema);