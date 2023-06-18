import express from "express";
import loginRouter from "./login";
const router = express.Router();
router.use("/test", (_, res) => res.json({ greeting: "Hello" }));
router.use("/login", loginRouter);

export default router;
