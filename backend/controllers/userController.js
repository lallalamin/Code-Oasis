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
}

const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await findOne({ username });
        //const isPasswordCode
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in loginUser: ", error.message);
    }  
}

export { signupUser, loginUser }