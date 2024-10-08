import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;
        if(!postedBy || !text){
            return res.status(400).json({ error: "Postedby and text fields are required" });
        }

        const user = await User.findById(postedBy);
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        
        if(user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({ error: "Unauthorized to create post" });
        }

        const maxLength = 500;

        if(text.length > maxLength){
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
        }

        const newPost = new Post({ postedBy, text, img});

        await newPost.save();
        res.status(201).json({ error: "Post created successfully", newPost });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in createPost: ", error.message);   
    }
};

const getPost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ error: "Post Found", post });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in getPost: ", error.message);  
    }
};

const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ error: "Post not found" });
        }

        if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({ error: "Unauthorized to delete post"});
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ error: "Post deleted successfully", post });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in deletePost: ", error.message);  
    }
};

const likeUnlikePost = async(req,res) => {
    try {
        const {id:postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({ error : "Post not found"});
        }

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost){
            //Unlike post
            await Post.updateOne({ _id:postId }, {$pull: {likes: userId}}); //inside the likes array pull out the like of the user
            res.status(200).json({error: "Post unliked successfully"});
        }
        else{
            //like post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({error: "Post liked successfully"});
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in likeUnlikePost: ", error.message);  
    }
};

const replyPost = async(req, res) =>{
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;
        
        if(!text){
            return res.status(400).json({error: "Text field is required"});
        }

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({ error : "Post not found"});
        }

        const reply = { userId, text, userProfilePic, username};

        post.replies.push(reply);
        await post.save();

        res.status(200).json({error: "Reply added successfully", post});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in replyPost: ", error.message);  
    }
};

const getFeedPosts = async(req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        const following = user.following;
        const feedPosts = await Post.find({postedBy:{$in:following}}).sort({createdAt: -1}); // this mean find post in the following list and sort it by descending order so that we can get the latest post
        
        res.status(200).json({feedPosts});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in getFeedPosts: ", error.message);
    }
}

export { createPost, getPost, deletePost, likeUnlikePost, replyPost, getFeedPosts };