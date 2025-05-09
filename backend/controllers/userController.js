import User from '../models/userModel.js';
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
import mongoose from 'mongoose';
import moment from "moment-timezone";
import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/postModel.js';

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
const Email = mongoose.model('Email', emailSchema);

const getUserProfile = async(req, res) =>{
    // We will fetch user profile either with username or userId
    // query is either username or userId
    const { query } = req.params;
    try {
        let user;
        // query is userId
        if(mongoose.Types.ObjectId.isValid(query)){
            user = await User.findOne({_id: query}).select("-password").select("-updatedAt");
        }
        else{
            //query is username
            user = await User.findOne({ username: query}).select("-password").select("-updatedAt");
        }
        if(!user) return res.status(400).json({error: "User not found"});

        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in getUserProfile: ", error.message);
    }
}


// Signup user
// This will create a user and their JWT and cookies which last for 15d. If the user exist then it will give message that they exist
const signupUser = async(req, res) => {
    try{
        const { name, email, username, password, timezone} = req.body;
        const user = await User.findOne({$or:[{email}, {username}]}); // this will find out if the email or the username is already exist
        if(user){
            return res.status(400).json({error:"Username or email already exists."});
        }

        if(!timezone){
            timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }

        const timezoneOffset = moment.tz(timezone).utcOffset() / 60;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
            timezone,
            timezoneOffset
        });

        await newUser.save();

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
            });
        }
        else{
            res.status(400).json({ error: "Invalid user data."});
        }
    }
    catch (err){
        res.status(500).json({ error: err.message });
        console.log("Error in signupUser: ", err.message);
    }
};

const loginUser = async(req, res) => {
    try {
        const { username, password, timezone } = req.body;
        const user = await User.findOne({ username }); //when the user is not found, you cannot reach to password of undefined
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // we put "" because we don't want to compare existing password with a null

        if(!user || !isPasswordCorrect) return res.status(400).json({error: "Invalid username or password"});

        if(user.isFrozen){
            user.isFrozen = false;
            await user.save();
        }

        user.timezone = timezone;
        user.timezoneOffset = moment.tz(timezone).utcOffset() / 60;

        await user.save();

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
            bannerPic: user.bannerPic,
            timezone: user.timezone,
            timezoneOffset: user.timezoneOffset
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in loginUser: ", error.message);
    }  
};

const logoutUser = (req, res) =>{
    try {
        res.cookie("jwt", "", {maxAge: 1});
        res.status(200).json({error: "User logged out successfully"});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in logoutUser: ", error.message);
    }
};

const followUnfollowUser = async(req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) return res.status(400).json({error: "You cannot follow/unfollow yourself"});

        if(!userToModify || !currentUser) return res.status(400).json({error: "User not found"});

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // Unfollow User
            // Modify current user following, modify followers of userToModify
            await User.findByIdAndUpdate(req.user._id, { $pull: {following: id}});  //req.user._id is the current user, by pull we are removing the user that current user want to unfollow
            await User.findByIdAndUpdate(id, { $pull: {followers: req.user._id}});  // we are removing the followers from the user that our current user want to unfollow
            res.status(200).json({message: "User unfollowed successfully"});
        }
        else{
            // Follow User
            await User.findByIdAndUpdate(req.user._id, { $push: {following: id}}); //the current user is following
            await User.findByIdAndUpdate(id, { $push: {followers: req.user._id}});
            res.status(200).json({message: "User followed successfully"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in followUnfollowUser: ", error.message);
    }
};

const updateUser = async(req, res) =>{
    const { name, email, username, password, bio, linkedinUrl, hobbies} = req.body;
    let { profilePic, bannerPic } = req.body;
    const userId = req.user._id;
    
    try {
        let user = await User.findById(userId);
        // let usernameExists = await User.findOne({ username });

        if(!user) return res.status(400).json({message: "User not found"});

        if(req.params.id !== userId.toString()) return res.status(400).json({message: "You cannot update other user's profile"}) // we need to convert to string because the userId is an object

        // check if the user is trying to update their username and if it already exists in the database
        // if(usernameExists && usernameExists._id.toString() !== userId.toString()){
        //     return res.status(400).json({message: "Username already exists"});
        // }
        
        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if(profilePic){
            if(user.profilePic){
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]); // if the user already have a profile pic, we will remove the old one from cloudinary
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic); //upload the profile pic to cloudinary
            profilePic = uploadedResponse.secure_url;
        }

        if(bannerPic){
            if(user.bannerPic){
                await cloudinary.uploader.destroy(user.bannerPic.split("/").pop().split(".")[0]); // if the user already have a banner pic, we will remove the old one from cloudinary
            }

            const bannerUploadedResponse = await cloudinary.uploader.upload(bannerPic); //upload the banner pic to cloudinary
            bannerPic = bannerUploadedResponse.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;
        user.bannerPic = bannerPic || user.bannerPic;
        // user.linkedinUrl = linkedinUrl || user.linkedinUrl;
        // user.hobbies = hobbies || user.hobbies;

        user = await user.save();

        //Find all posts that this user replied and update their username and profile pic
        await Post.updateMany(
            {"replies.userId":userId},
            {
                $set:{
                    "replies.$[reply].username": user.username,
                    "replies.$[reply].userProfilePic":user.profilePic
                }
            },
            {arrayFilters: [{"reply.userId":userId}]}
        )

        // remove password from response
        user.password = null;

        res.status(200).json({user});
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in updateUser: ", error.message);
    }
}

const getSuggestedUsers = async(req, res) => {
    try {
        //exclude the current user from suggested users array and the current user is following.
        const userId = req.user._id;
        const usersFollowedByYou = await User.findById(userId).select("following");
        const users = await User.aggregate([
            {
                $match:{
                    _id:{$ne: userId},
                }
            },
            {
                $sample:{size:10}
            }
        ])

        const filteredUsers = users.filter(user => !usersFollowedByYou.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 5);

        suggestedUsers.forEach(user => user.password = null);


        res.status(200).json({suggestedUsers});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const freezeAccount = async(req, res) => {
    try {
        const user = await User.find(req.user._id);
        if(!user) return res.status(404).json({error: "User not found"});

        user.isFrozen = true;
        await user.save();

        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getFollowDetails = async(req, res) => {
    const { userIds } = req.body;
    try {
        const users = await User.find({ _id: { $in: userIds } }, 'username name profilePic following followers');

        if(!users) return res.status(404).json({error: "Users not found"});

        console.log(users);
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const storeEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Store the new email
        const existingEmail = await Email.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Your email is already in the waitlist :)" });
        }

        const newEmail = new Email({ email });
        await newEmail.save();

        // Get the updated total count of emails in the waitlist
        const count = await Email.countDocuments();

        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error("Error in storeEmail:", error); // Logs the exact error
        res.status(500).json({ error: error.message });
    }
};


const getEmailCount = async (req, res) => {
    try {
        const count = await Email.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile, getSuggestedUsers, freezeAccount, getFollowDetails, storeEmail, getEmailCount };