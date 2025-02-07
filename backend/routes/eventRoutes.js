import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {createEvent} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", protectRoute, createEvent);

export default router;