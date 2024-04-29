const Post = require('../Models/post')

const createPost = async (req,res) =>{
    console.log(req.body.username);
    try {
        const post =  new Post(req.body)
        const newpost = await post.save()
        return res.status(200).json("Post saved")
    } catch (error) {
        console.log("error",error);
        return res.status(500).json(error)
    }
}


const getpostByid = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post)

    } catch (error) {
        return res.status(500).json("No data display",error)
    }
}
const getAllPost = async (req,res) => {
    let category = req.query.category;
    let posts;
    try {
        if(category){
            posts = await Post.find({categories:category})
        }else{
            posts = await Post.find({})
        }
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json("No data display",error)
        
    }
}

const updatePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(400).json({msg:'Post not found'})
        }
        await Post.findByIdAndUpdate(req.params.id, {$set:req.body})

        return res.status(200).json({msg:'Successfully updated'})
    } catch (error) {
        return res.status(500).json("Post not updated",error)
    }
}

const deletePost = async(request, response) => {
    try {
        const post = await Post.findByIdAndDelete(request.params.id);
        console.log(post);
        
        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json({error:error.message})
    }
}
module.exports = {getAllPost,createPost,getpostByid,updatePost,deletePost};