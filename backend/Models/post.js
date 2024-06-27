const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minLength:6,
        maxLength:200
    },
    description: {
        type: String,
        required: true,
        minLength:6,
        maxLength:5000
    },
    picture: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        minLength:2,
        maxLength:30
    },
    categories: {
        type: String,
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0,
        set: v => Math.max(v, 0)  
    },
    dislikes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [String],
        default: []
    },
    dislikedBy: {
        type: [String],
        default: []
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.ObjectId,
        ref: 'User'
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
