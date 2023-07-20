import express from "express";
import prisma from "../prisma/primsa";
const profileRouter = express.Router();

profileRouter.post("/", async (req, res, next) => {
  //   const data = req.body;

  //   const profile = await prisma.profile.findUnique({

  //   })

  res.send({ message: "API WORKS", error: false });
});

export default profileRouter;
