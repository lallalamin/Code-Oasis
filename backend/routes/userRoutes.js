import express from "express";
import { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollowUser); // to protec the route, if you are not login or not have an account you cannot follow someone
router.post("/update/:id", protectRoute, updateUser);

export default router;