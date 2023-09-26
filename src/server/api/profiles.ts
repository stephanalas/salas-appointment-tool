import express from "express";
import prisma from "../prisma/primsa.ts";
const profileRouter = express.Router();

profileRouter.get("/", async (_req, res, next) => {
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

// TODO: add profile import put route

profileRouter.post("/import", async (req, res, next) => {
  try {
    enum Stage {
      PROSPECT = "PROSPECT",
      CLIENT = "CLIENT",
    }
    type ProfileData = {
      name: string;
      email: string;
      industry: string;
      stage: Stage;
      phone: string;
      notes: string;
    };
    const profiles = req.body;
    // profiles not inserting into table properly
    // might be race condition
    // find better way to insert asynchronously
    // Promise.all might be the issue try async for loop

    Promise.all(
      profiles.map((profile: ProfileData) => {
        const [firstName, lastName] = profile.name.split(" ");
        const { industry, notes, stage, email } = profile;

        return prisma.profile.upsert({
          where: {
            email: profile.email,
          },
          update: {
            firstName,
            lastName,
            phoneNumber: profile.phone,
            industry,
            notes,
            stage,
          },
          create: {
            firstName,
            lastName,
            email,
            phoneNumber: profile.phone,
            industry,
            notes,
            stage,
          },
        });
      })
    );
    res.send({ message: "Profiles successfully imported", error: false });
  } catch (error) {
    next(error);
  }
});

export default profileRouter;
