import express from "express";
import prisma from "../prisma/primsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUser } from "../utility";

const taskRouter = express.Router();

taskRouter.get("/", async (req, res, next) => {
  try {
    const { id: userId } = await getUser(req);
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        profile: true,
      },
    });
    res.send(tasks);
  } catch (error) {
    next(error);
  }
});

taskRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = await getUser(req);
    // create task assign user id
    const { deadline, urgency, completed, profile, description } = data;
    await prisma.task.create({
      data: {
        deadline,
        urgency,
        completed,
        profileId: profile.id,
        description,
        userId: id,
      },
    });
    res.send({ error: false, message: "Task created" });
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
