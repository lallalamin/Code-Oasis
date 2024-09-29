import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// the reason we have next is because if we look at userRoutes "router.post("/follow/:id", protectRoute, followUnfollowUser);" this function is called. The next is saying to run the next 
// function which is followUnfollowUser
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // take the token
        
        if(!token) return res.status(401).json({message: "Unauthorized"}); // if no token, no one login
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // if there is token we are trying to verify

        const user = await User.findById(decoded.userId).select("-password"); // get userId from the payload and try to find that user in our database
        
        req.user = user; // if success, we call the next function

        next();

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in protectRoute: ", error.message);
    }
};

export default protectRoute;

