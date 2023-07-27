import express from "express";
import loginRouter from "./login.ts";
import profileRouter from "./profiles.ts";
import { authorization } from "../middleware/authorization.ts";
import taskRouter from "./tasks.ts";
import appointmentRouter from "./appointments.ts";
const router = express.Router();
router.use("/test", authorization, (_, res) => res.json({ greeting: "Hello" }));
router.use("/login", loginRouter);
router.use("/profiles", authorization, profileRouter);
router.use("/tasks", authorization, taskRouter);
router.use("/appointments", authorization, appointmentRouter);
router.delete("/logout", (_req, res, _next) => {
  res
    .clearCookie("access_token")
    .status(200)
    .send({ message: "Log out successful", error: false });
});

export default router;
