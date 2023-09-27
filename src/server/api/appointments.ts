import express from "express";
import { getUser } from "../utility.ts";
import prisma from "../prisma/primsa.ts";
import { DateTime } from "luxon";

const appointmentRouter = express.Router();

appointmentRouter.get("/", async (req, res, next) => {
  try {
    const { id } = await getUser(req);
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: id,
      },
      include: {
        profile: true,
      },
    });
    // filter out appointments that have pass

    const filteredAppointments = appointments.filter((appointment) => {
      const { days } = DateTime.fromJSDate(appointment.dateTime).diffNow(
        "days"
      );
      return days >= 0;
    });

    res.send(filteredAppointments);
  } catch (error) {
    next(error);
  }
});

appointmentRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = await getUser(req);
    // send email notification
    // status is sent if rejected array empty, pending null and accepted includes profile email
    // sentTime should be DateTime when sendMail completes
    // transmission type is based on profile stage
    // isAppointment should be true
    // responsed? take this out
    // body should be text of message object
    // associate profile
    // campaign may need to be optional on transmissions

    const { notes, profile, dateTime } = data;
    const appointment = await prisma.appointment.create({
      data: {
        notes,
        userId: id,
        profileId: profile.id,
        dateTime,
      },
    });
    res.send({ error: false, message: "Appointment created" });
  } catch (error) {
    next(error);
  }
});

appointmentRouter.put("/:appointmentId", async (req, res, next) => {
  try {
    const {
      body: data,
      params: { appointmentId },
    } = req;
    const { id } = await getUser(req);
    delete data.id;
    delete data.contact;
    await prisma.appointment.update({
      where: {
        id: +appointmentId,
      },
      data: {
        ...data,
        profile: {
          connect: {
            id: data.profile.id,
          },
        },
        user: {
          connect: {
            id,
          },
        },
      },
    });
    res.send({ error: false, message: "Appointment updated" });
  } catch (error) {
    next(error);
  }
});

appointmentRouter.delete("/:appointmentId", async (req, res, next) => {
  try {
    // send cancel appointment email
    const { appointmentId } = req.params;
    await prisma.appointment.delete({
      where: {
        id: +appointmentId,
      },
    });
    res.send({ error: false, message: "Appointment cancelled and deleted" });
  } catch (error) {
    next(error);
  }
});

export default appointmentRouter;
