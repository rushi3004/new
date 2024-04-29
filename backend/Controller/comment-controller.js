const Comment = require('../Models/Comment')

const newcomment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

const commentById = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        return response.status(200).json(comments);
    } catch (error) {
       return response.status(500).json(error)
    }
}

const commentDelete = async(request, response) => {
    try {
        const comment = await Comment.findByIdAndDelete(request.params.id);
        console.log(comment);
        return response.status(200).json('comment deleted successfully');
    } catch (error) {
        return response.status(500).json({error:error.message})
    }
}
module.exports = {newcomment,commentById,commentDelete};