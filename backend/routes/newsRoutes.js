import express from 'express';
import { scrapeTechNews } from '../controllers/newsController.js';

const router = express.Router();

router.get("/", scrapeTechNews);

export default router;