const Post = require('../Models/post')

const createPost = async (req,res) =>{
    console.log(req.body.username);
    try {
        const post =  new Post(req.body)
        const newpost = await post.save()
        return res.status(200).json({message:"Post saved",newpost})
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({message:"Not Posted",error})
    }
}


const getpostByid = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        return res.status(200).json({message:"Post get it",post})

    } catch (error) {
        return res.status(500).json({message:"No data display",error})
    }
}

const getAllPost = async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;

    const query = category ? { categories :category } : {};

    const allUser = await Post.find(query);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalUser = allUser.length;
    results.pageCount = Math.ceil(allUser.length / limit);

    if (lastIndex < allUser.length) {
        results.next = {
            page: parseInt(page) + 1,
        };
    }
    if (startIndex > 0) {
        results.prev = {
            page: parseInt(page) - 1,
        };
    }

    results.result = allUser.slice(startIndex, lastIndex);
    res.json(results);
};


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
        
        response.status(200).json({meg:'post deleted successfully'});
    } catch (error) {
        response.status(500).json({error:error.message})
    }
}

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likedBy.includes(req.body.username)) {
            post.likes += 1;
            post.likedBy.push(req.body.username);
            const index = post.dislikedBy.indexOf(req.body.username);
            if (index > -1) {
                post.dislikedBy.splice(index, 1);
                post.dislikes -= 1;
            }
            await post.save();
            res.status(200).json({ message: "Post liked", post });
        } else {
            res.status(400).json({ msg: 'Already liked the post' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error liking post' });
    }
}

const dislikePost =async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.dislikedBy.includes(req.body.username)) {
            post.dislikes += 1;
            post.dislikedBy.push(req.body.username);
            const index = post.likedBy.indexOf(req.body.username);
            if (index > -1) {
                post.likedBy.splice(index, 1);
                post.likes -= 1;
            }
            await post.save();
            res.status(200).json({ message: "Post disliked", post });
        } else {
            res.status(400).json({ msg: 'Already disliked the post' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error disliking post' });
    }
}



module.exports = {getAllPost,createPost,getpostByid,updatePost,deletePost,likePost,dislikePost};