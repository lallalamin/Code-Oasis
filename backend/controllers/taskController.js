import mongoose from 'mongoose';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
import dotenv from "dotenv";
dotenv.config();


export const getTasks = async (req, res) => {
    const userId = req.user._id;
    try {
        const tasks = await Task.find({ userId });

        if (!tasks) return res.status(404).json({ message: "Tasks not found" });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const completedTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.status === "completed") {
            return res.status(400).json({ success: false, message: "Task already completed" });
        }

        task.status = "completed";
        await task.save();

        const user = await User.findById(task.userId);

        user.xp += task.reward;

        const incompleteTasks = await Task.find({ userId: user._id, status: "incomplete" });

        if (incompleteTasks.length === 0) {
            const currentDate = new Date().setHours(0, 0, 0, 0); // Today's date
            const lastCompletedDate = new Date(user.lastCompletedDate || 0).setHours(0, 0, 0, 0);
      
            if (currentDate === lastCompletedDate + 86400000) {
              user.streakCount += 1; // Increment streak
            } else if (currentDate > lastCompletedDate + 86400000) {
              user.streakCount = 0; // Reset streak
            }
      
            user.lastCompletedDate = new Date(); // Update last completed date
        }
      
        await user.save();

        res.json( task, user.xp, user.streakCount);
      } catch (error) {
        res.status(500).json({ message: "Error updating task" });
      }
}

export const createTask = async (req, res) => {
    const { title } = req.body;
    try {
        if (!req.user || !mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const taskCount = await Task.countDocuments({ userId: req.user._id });
        if (taskCount >= 10) {
            return res.status(400).json({ success: false, message: "You have reached the maximum number of tasks" });
        }

        const newTask = new Task({ 
            userId: req.user._id , 
            title: title,
            status: "incomplete",
            reward: 10
        });
        await newTask.save();
        console.log(newTask);   
        res.status(201).json(newTask);
        
    } catch (error) {
        console.error("Error creating task:", error.message);
        res.status(500).json({ error: "Error creating task" });
    }
}

export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        if (!req.user || !mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const task = await Task.findById(taskId);

        if (!task) return res.status(404).json({ message: "Task not found" });

        await Task.findByIdAndDelete(taskId);

        res.json({ message: "Task deleted", task });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
}

export const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title } = req.body;
    try {
        const task = await Task.findById(taskId);
        console.log(task);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to update task" });
        }

        task.title = title;
        await task.save();

        res.json({ message: "Task updated", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
}

export const resetTasksForNewDay = async (req, res) => {
    const AUTH_TOKEN = process.env.RESET_API_TOKEN;
    const providedToken = req.headers.authorization?.split(" ")[1];
    
    if (providedToken !== AUTH_TOKEN) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    try {
      // Add logs for debugging
    console.log("Resetting tasks...");
    const users = await User.find({});

    for (const user of users){
        if(!user.timezone) continue;

        const now = moment().tz(user.timezone);

        if(now.hours() === 0 && now.minutes() === 0) {
            console.log(`Resetting tasks for user: ${user.username} in ${user.timezone}`);
            await Task.updateMany({ userId: user._id }, { status: "incomplete" });

            const lastCompletedDate = user.lastCompletedDate ? moment(user.lastCompletedDate).tz(user.timezone) : null;

            if (lastCompletedDate && now.diff(lastCompletedDate, "days") >= 1) {
                user.streakCount = 0; 
                user.lastCompletedDate = null;
            }

            await user.save();
        }
    } 
      res.status(200).json({ message: "Tasks reset and streaks updated successfully." });
    } catch (error) {
      console.error("Error resetting tasks or updating streaks:", error.message);
      res.status(500).json({ message: "Error resetting tasks or updating streaks." });
    }
  };


export default { getTasks, completedTask, createTask, deleteTask, updateTask, resetTasksForNewDay };