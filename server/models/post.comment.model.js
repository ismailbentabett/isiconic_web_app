const mongoose = require('mongoose');
const postCommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.ObjectId,
        required: true,
    },

    userId: {
        type: mongoose.ObjectId,
        required: true,
    },
    parentCommentId: {
        type: mongoose.ObjectId,
        required: false, // if not populated, then its a top level comment
    },
 
    username: {
        type: String,
        required: true,
    },

    detail: {
        type: String,
        required: true,
    },
    replies:{ type : Array , "default" : [] },

})





const Comment = mongoose.model('comment', postCommentSchema);

module.exports = Comment;