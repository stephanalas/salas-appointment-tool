import express from "express";
import loginRouter from "./login";
import { authorization } from "../middleware/authorization";
const router = express.Router();
router.use("/test", authorization, (_, res) => res.json({ greeting: "Hello" }));
router.use("/login", loginRouter);

export default router;
