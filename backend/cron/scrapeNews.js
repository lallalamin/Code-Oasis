import cron from "node-cron";
import { scrapeTechNews } from "../controllers/newsController.js";

const scrapeNewsJob = cron.schedule("06 * * * *", async () => {
    await scrapeTechNews();
    console.log("📰 Scraped news articles successfully!");
});

export default scrapeNewsJob;