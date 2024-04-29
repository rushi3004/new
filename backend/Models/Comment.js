const mongoose = require('mongoose');

const CommentSchema = new  mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
},
{
    collection:"comment"
});


const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;