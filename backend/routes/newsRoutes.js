import express from 'express';
import { scrapeTechNews, getTechNews } from '../controllers/newsController.js';

const router = express.Router();

router.get("/", scrapeTechNews);
router.get("/news",getTechNews);

export default router;