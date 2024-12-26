import express from "express";

const router = express.Router();

router.post("/", (req, res) => res.send("Message Route"));

export default router;