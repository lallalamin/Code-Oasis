import express from 'express';
import { scrapTechNews } from '../controllers/newsController.js';

const router = express.Router();

router.get("/", scrapTechNews);

export default router;