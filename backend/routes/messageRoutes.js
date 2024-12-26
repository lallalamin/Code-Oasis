import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage);
router.get("/:otherUserId", protectRoute, getMessages);


export default router;