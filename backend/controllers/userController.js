import User from '../models/userModel.js';

const signupUser = async(res, req) => {
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
    catch (error){
        res.status(500).json({ message: error.message });
        console.log("Error in signupUser: ", err.message);
    }
}

export { signupUser }