import mongoose from 'mongoose';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';


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
    const taskId = req.params.taskId;
    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.status === "completed") {
            return res.status(400).json({ success: false, message: "Task already completed" });
        }

        task.status = "completed";
        await task.save();
        const user = await User.findByIdAndUpdate(
            task.userId,
            { $inc: { xp: task.reward } },
        );
    
        res.json( task, user.xp );
      } catch (error) {
        res.status(500).json({ message: "Error updating task" });
      }
}

export const createTask = async (req, res) => {
    const { title } = req.body;
    try {
        console.log(req.user);
        console.log(req.body);
        if (!req.user || !mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
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
    const taskId = req.params.taskId;
    try {
        if (!req.user || !mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const task = await Task.findById(taskId);

        if (!task) return res.status(404).json({ message: "Task not found" });

        await Task.findByIdAndDelete(taskId);

        res.json({ message: "Task deleted", task });
    } catch (error) {
        console.error("Error deleting task:", error.message);
        res.status(500).json({ message: "Error deleting task" });
    }
}

export const updateTask = async (req, res) => {
    const taskId = req.params.taskId;
    const { title } = req.body;
    try {
        const task = await Task.findById(taskId);

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


export default { getTasks, completedTask, createTask, deleteTask, updateTask };