import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {createEvent, getAllEvents, editEvent, deleteEvent, getUserEvents} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", protectRoute, getAllEvents);
router.get("/:id", protectRoute, getUserEvents);
router.put("/update/:id", protectRoute, editEvent);
router.post("/create", protectRoute, createEvent);
router.delete("/delete/:id", protectRoute, deleteEvent);


export default router;