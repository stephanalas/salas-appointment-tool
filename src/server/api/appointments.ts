import express from "express";
import { getUser } from "../utility.ts";
import prisma from "../prisma/primsa.ts";
import { DateTime } from "luxon";
import mailer from "../mailer.ts";
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
    const { id, email, name } = await getUser(req);

    const { notes, profile, dateTime } = data;
    const appointment = await prisma.appointment.create({
      data: {
        notes,
        userId: id,
        profileId: profile.id,
        dateTime,
      },
    });
    if (appointment) {
      // send email
      // date time formating on message object
      const message = {
        from: process.env.EMAIL_FROM,
        to: profile.email,
        subject: "Appointment Confirmation",
        html: `
        <h4>Appointment Details</h4>
        <p> You have an appointment with ${name}</p>
        <p>date: ${appointment.dateTime}</p>
        <p>time: ${appointment.dateTime}</p>
        <p>Please email ${email} if you need to reschedule or for any questions</p>
        `,
      };
      const mailResponse = await mailer.sendMail(message);

      if (mailResponse) {
        const { accepted, pending, rejected } = mailResponse;

        const status =
          accepted.includes(profile.email) && !pending && !rejected.length;

        const transmission = await prisma.transmission.create({
          data: {
            status: status ? "SUCCESS" : "FAILED",
            sentDateTime: DateTime.now().toISO()!,
            transmissionType: profile.stage,
            isAppointment: true,
            profileId: profile.id,
          },
        });
        console.log("Transmission Created: ", transmission);
      }
    }
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
    // TODO: send email when appointment is updated

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
