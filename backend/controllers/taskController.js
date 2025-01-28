import Task from '../models/taskModel.js';


export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getTasks };