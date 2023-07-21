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
    res.send({ message: "Profile Created", error: false });
  } catch (error) {
    next(error);
  }
});

profileRouter.put("/:id", async (req, res, next) => {
  try {
    const data = req.body;
    await prisma.profile.update({
      where: {
        id: data.id,
      },
      data,
    });
    res.send({ message: "Profile Updated", error: false });
  } catch (error) {
    next(error);
  }
});

profileRouter.delete("/:id", async (req, res, next) => {
  try {
    // deleting profile might require deleting other associated data first
    const profileId = req.params.id;

    await prisma.profile.delete({
      where: {
        id: +profileId,
      },
    });
    res.send({ message: "Profile Deleted", error: false });
  } catch (error) {
    next(error);
  }
});
// TODO: DELETE PROFILE AND UPDATE PROFILE

export default profileRouter;
