import express from "express";
import prisma from "../prisma/primsa.ts";
import { DateTime } from "luxon";
const transmissionRouter = express.Router();

transmissionRouter.get("/", async (_req, res, next) => {
  try {
    const transmissions = await prisma.transmission.findMany({
      include: {
        profile: true,
      },
    });

    const formattedTransmissions = transmissions.map((transmission) => {
      const { profile, sentDateTime } = transmission;
      const luxonDt = DateTime.fromJSDate(sentDateTime);
      const date = luxonDt.toFormat("MM/dd/yy");
      const time = luxonDt.toFormat("h:mm a");

      return {
        id: transmission.id,
        profileName: `${profile.firstName} ${profile.lastName}`,
        sentTo: profile.email,
        isAppointment: transmission.isAppointment,
        transmissionType: transmission.transmissionType,
        date,
        time,
        status: transmission.status,
      };
    });

    res.send(formattedTransmissions);
  } catch (error) {
    next(error);
  }
});

export default transmissionRouter;
