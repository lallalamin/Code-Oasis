import cron from "cron";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const RESET_URL = "https://code-oasis.onrender.com/api/tasks/reset";
const AUTH_TOKEN = process.env.RESET_API_TOKEN;

const resetTasksJob = new cron.CronJob("0 0 * * *", function () {
    console.log("Running resetTasksJob...");
  
    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`, // Include the token in the Authorization header
      },
    };
  
    const req = https.get(RESET_URL, options, (res) => {
      let data = "";
  
      res.on("data", (chunk) => {
        data += chunk;
      });
  
      res.on("end", () => {
        console.log(`Response Status: ${res.statusCode}`);
        console.log(`Response Body: ${data}`);
      });
    });
  
    req.on("error", (e) => {
      console.error("Error while sending reset request:", e);
    });
  });

export default resetTasksJob;
