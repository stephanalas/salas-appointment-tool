import express from "express";
import prisma from "../prisma/primsa.ts";
import { getUser } from "../utility.ts";
import { DateTime } from "luxon";

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

taskRouter.get("/uncompletedCount", async (req, res, next) => {
  try {
    const { id: userId } = await getUser(req);
    const uncompletedTasks = await prisma.task.findMany({
      where: {
        userId,
        completed: false,
      },
    });

    res.send({ count: uncompletedTasks.length });
  } catch (error) {
    next(error);
  }
});

taskRouter.get("/urgentCount", async (req, res, next) => {
  try {
    const { id: userId } = await getUser(req);
    const urgentTasks = await prisma.task.findMany({
      where: {
        userId,
        urgency: "URGENT",
      },
    });
    res.send({ count: urgentTasks.length });
  } catch (error) {
    next(error);
  }
});

taskRouter.get("/:timestamp", async (req, res, next) => {
  try {
    const timestamp = +req.params.timestamp;
    const { id: userId } = await getUser(req);
    const tasksWithDeadline = await prisma.task.findMany({
      where: {
        userId,
        deadline: { not: null },
      },
      include: {
        profile: true,
      },
    });
    const checkDate = DateTime.fromMillis(timestamp);
    const filteredTasks = tasksWithDeadline.filter((task) => {
      const { deadline } = task;
      if (deadline) {
        const checkMonth = checkDate.month;
        const checkYear = checkDate.year;
        // tasks will have deadline
        const taskMonth = deadline?.getMonth() + 1;
        const taskYear = deadline?.getFullYear();
        return checkMonth == taskMonth && checkYear == taskYear;
      }
      return false;
    });

    res.send(filteredTasks);
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
        description,
        userId: id,
        profileId: profile.id,
      },
    });
    res.send({ error: false, message: "Task created" });
  } catch (error) {
    next(error);
  }
});

taskRouter.put("/:taskId", async (req, res, next) => {
  try {
    const {
      body: data,
      params: { taskId },
    } = req;
    delete data.id;
    await prisma.task.update({
      where: {
        id: +taskId,
      },
      data: {
        ...data,
        profile: {
          connect: {
            id: data.profile.id,
          },
        },
      },
    });
    res.send({ error: false, message: "Task updated" });
  } catch (error) {
    next(error);
  }
});

taskRouter.delete("/:taskId", async (req, res, next) => {
  try {
    const id = +req.params.taskId;
    await prisma.task.delete({
      where: {
        id,
      },
    });
    res.send({ error: false, message: "Task deleted" });
  } catch (error) {
    next(error);
  }
});

export default taskRouter;
