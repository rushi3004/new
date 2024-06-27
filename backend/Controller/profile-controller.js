const User = require('../Models/User')
const Post = require('../Models/post')

const Profile = async(req,res) =>{
        try {
            const user = await User.find({username : req.params.username}).select("-password")
            return res.status(200).json(user)
    
        } catch (error) {
            console.log("Error in finding user",error);
        }
    }

const UserPost = async(req,res) =>{
    try {
        const post = await Post.find({username : req.params.username});
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({msg:"No post display",error})
    }
}

const userInfo = async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json({msg:"here is data",user})
        
    } catch (error) {
        return res.status(500).json({msg:"No data found"})
    }
}



module.exports = {Profile,UserPost,userInfo}