import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  status: {
    type: String,
    enum: ["completed", "incomplete"],
    default: "incomplete",
  },
  reward: {
    type: Number,
    default: 10, // Default reward points
  },
}, {
  timestamps: true,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
