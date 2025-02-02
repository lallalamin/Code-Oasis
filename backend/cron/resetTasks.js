import cron from "cron";
import https from "https";

const RESET_URL = "https://code-oasis.onrender.com/api/tasks/reset";

const resetTasksJob = new cron.CronJob("0 0 * * *", function () {
  https
    .get(RESET_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("Tasks reset and streaks updated successfully.");
      } else {
        console.log("Task reset request failed with status:", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("Error while sending reset request:", e);
    });
});

export default resetTasksJob;
