import express from "express";
import { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile, getSuggestedUsers, freezeAccount, getFollowDetails, storeEmail, getEmailCount } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";


const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers)
router.get("/emailCount", getEmailCount)
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/sub", storeEmail);
router.post("/followDetails", protectRoute, getFollowDetails);
router.post("/follow/:id", protectRoute, followUnfollowUser); // to protec the route, if you are not login or not have an account you cannot follow someone
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);



export default router;