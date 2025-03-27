import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import {v2 as cloudinary} from 'cloudinary';
import { app, server } from './socket/socket.js';
import path from 'path';
import job from './cron/cron.js';
import resetTaskJob from './cron/resetTask.js';

dotenv.config(); // to be able to read the content in the .env file

connectDB(); 
job.start();
resetTaskJob.start();

const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//Middlewares
app.use(express.json({limit: "50mb"})); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); //to parse form data in the req.body, it is set to tru because it will allow it to parse nested data without problem 
app.use(cookieParser()); // to read and access the cookie

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/technews", newsRoutes);

// http://localhost:5000 => both backend and frontend

if(process.env.NODE_ENV === "production") { // if we are in production mode
    app.use(express.static(path.join(_dirname, "/frontend/dist")));
    app.get("*", (req, res) => { // to serve the react app in production mode
        res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
    });
}


server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT} heyy`));