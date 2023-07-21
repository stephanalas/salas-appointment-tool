import express from "express";
import prisma from "../prisma/primsa";
const profileRouter = express.Router();

profileRouter.get("/", async (req, res, next) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.send(profiles);
  } catch (error) {
    next(error);
  }
});

profileRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    const profile = await prisma.profile.findUnique({
      where: {
        email: data.email,
      },
    });

    if (profile) {
      throw new Error("Profile already exists");
    }
    await prisma.profile.create({
      data,
    });
    res.send({ message: "API WORKS", error: false });
  } catch (error) {
    next(error);
  }
});
// TODO: DELETE PROFILE AND UPDATE PROFILE

export default profileRouter;
