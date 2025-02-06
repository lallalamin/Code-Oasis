import cron from "node-cron";
import { resetTasksForUser } from "./controllers/taskController.js"; 

// Run every hour (at the start of the hour)
cron.schedule("0 * * * *", async () => {
    const currentHourUTC = new Date().getUTCHours(); // Get current hour in UTC
    console.log(`⏳ Running batch reset for UTC offset ${currentHourUTC - 12}...`);
    
    await resetTasksForUser(currentHourUTC - 12);
});
