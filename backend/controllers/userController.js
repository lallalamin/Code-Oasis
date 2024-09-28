import User from '../models/userModel.js';
import bcrypt from "bcryptjs"
import generateTokenAndsetCookie from '../utils/helpers/generateTokenAndSetCookie.js';

// Signup user
// This will create a user and their JWT and cookies which last for 15d. If the user exist then it will give message that they exist
const signupUser = async(req, res) => {
    try{
        const { name, email, username, password} = req.body;
        const user = await User.findOne({$or:[{email}, {username}]}); // this will find out if the email or the username is already exist
        if(user){
            return res.status(400).json({message:"User already exists."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        if(newUser){
            generateTokenAndsetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            });
        }
        else{
            res.status(400).json({ message: "Invalid user data."});
        }
    }
    catch (err){
        res.status(500).json({ message: err.message });
        console.log("Error in signupUser: ", err.message);
    }
};

const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }); //when the user is not found, you cannot reach to password of undefined
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // we put "" because we don't want to compare existing password with a null

        if(!user || !isPasswordCorrect) return res.status(400).json({message: "Invalid username or password"});

        generateTokenAndsetCookie(username._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        });
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in loginUser: ", error.message);
    }  
};

const logoutUser = (req, res) =>{
    try {
        res.cookie("jwt", "", {maxAge: 1});
        res.status(200).json({message: "User logged out successfully"});
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in loginUser: ", error.message);
    }
};

export { signupUser, loginUser, logoutUser }