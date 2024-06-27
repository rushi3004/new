const mongoose = require('mongoose');

const userSchema =new  mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength:6
    },
    fullname:{
        type:String,
        required:true
        
    },
    profilePic :{
        type:String,
    },
    Bio:{
        type:String,
        required:true,
        minLength:10
    } ,
     interest: {
        type: [String],
        enum: ['Music', 'Movies', 'Sports', 'Art', 'Technology']
    },
});


const User = mongoose.model("user",userSchema);
module.exports = User 