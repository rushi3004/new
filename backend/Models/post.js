const mongoose = require('mongoose');
// const { objectId }= 'mongoose.Schema.Types'
const postSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        unique:true,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    picture: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    categories:{
        type:String,
        
    },
    createdDate:{
        type:Date
    },
    cretedBy:{
        type:mongoose.ObjectId,
        ref:'user'
    }
}, 
{
    collection: "post",
  }
);


const Post = mongoose.model("post",postSchema);
module.exports = Post 