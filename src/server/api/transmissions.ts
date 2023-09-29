import express from "express";
import prisma from "../prisma/primsa.ts";
const transmissionRouter = express.Router();

// wrote in two places. types could be shared between client and server using path mapping.
enum TransmissionStatus {
  SUCCESS,
  FAILED,
}

interface Transmission {
  id: number;
  sentTo: string;
  isAppointment: boolean;
  transmissionType: string;
  date: string;
  time: string;
  status: TransmissionStatus;
}

transmissionRouter.get("/", async (_req, res, next) => {
  try {
    const transmissions = await prisma.transmission.findMany();
    // format data
    // findMany should include profiles associated with transmissions
    //

    const formattedTransmissions = transmissions.map((transmission) => {
      // separate time and date
      return {
        id: transmission.id,
        // sentTo
        isAppointment: transmission.isAppointment,
        transmissionType: transmission.transmissionType,
        // date
        // time
        status: transmission.status,
      };
    });

    res.send(transmissions);
  } catch (error) {
    next(error);
  }
});

export default transmissionRouter;
