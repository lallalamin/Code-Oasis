import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getLeaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/lead", protectRoute, getLeaderboard);


export default router;