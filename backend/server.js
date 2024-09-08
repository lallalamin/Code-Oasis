import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); //to parse form data in the req.body, it is set to tru because it will allow it to parse nested data without problem 
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT} heyy`));