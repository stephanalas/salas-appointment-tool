import express from "express";
import prisma from "../prisma/primsa.ts";
const transmissionRouter = express.Router();

transmissionRouter.get("/", async (_req, res, next) => {
  try {
    const transmissions = await prisma.transmission.findMany();
    res.send(transmissions);
  } catch (error) {
    next(error);
  }
});

export default transmissionRouter;
