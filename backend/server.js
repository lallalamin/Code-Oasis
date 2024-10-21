import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config(); // to be able to read the content in the .env file

connectDB(); 
const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); //to parse form data in the req.body, it is set to tru because it will allow it to parse nested data without problem 
app.use(cookieParser()); // to read and access the cookie

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT} heyy`));