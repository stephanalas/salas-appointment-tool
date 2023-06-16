import express from "express";
const router = express.Router();

export default router;

router.get("/test", (_, res) => res.json({ greeting: "Hello" }));
