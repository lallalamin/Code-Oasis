import express from "express";
import { getTasks, completedTask, createTask, deleteTask, updateTask } from "../controllers/taskController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();


router.get("/:id", protectRoute, getTasks);
router.post("/create", protectRoute, createTask);
router.put("/update/:id", protectRoute, updateTask);
router.put("/complete/:id", protectRoute, completedTask);
router.delete("/:id", protectRoute, deleteTask);


export default router;