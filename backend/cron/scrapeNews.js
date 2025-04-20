import cron from "node-cron";
import { scrapeTechNews } from "../controllers/newsController.js";

const scrapeNewsJob = cron.schedule("0 6,18 * * *", async () => {
    await scrapeTechNews();
    console.log("📰 Scraped news articles successfully!");
});

export default scrapeNewsJob;