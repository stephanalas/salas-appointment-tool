import express from "express";
import prisma from "../prisma/primsa";
import jwt from "jsonwebtoken";
const taskRouter = express.Router();

taskRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {}
});

taskRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const token = req.cookies.access_token;
    const payload = await jwt.verify(token, process.env.SECRET_KEY!);
    // create task assign user id

    res.send({ error: false, message: "POST router" });
  } catch (error) {
    next(error);
  }
});

taskRouter.put("/:taskId", async (req, res, next) => {
  try {
  } catch (error) {}
});

taskRouter.delete("/:taskId", async (req, res, next) => {
  try {
  } catch (error) {}
});

export default taskRouter;
