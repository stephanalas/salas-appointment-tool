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

appointmentRouter.get("/:timestamp", async (req, res, next) => {
  try {
    const timestamp = +req.params.timestamp;
    const { id: userId } = await getUser(req);
    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
      },
      include: {
        profile: true,
      },
    });
    // find better name but this date is what we filter against
    const checkDate = DateTime.fromMillis(timestamp);
    const filterAppointments = appointments.filter((appointment) => {
      const { dateTime } = appointment;
      const checkMonth = checkDate.month;
      const checkYear = checkDate.year;
      const appointmentMonth = dateTime.getMonth() + 1;
      const appointmentYear = dateTime.getFullYear();
      return checkMonth == appointmentMonth && checkYear == appointmentYear;
    });

    res.send(filterAppointments);
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
            clientType: profile.stage,
            transmissionType: "Initial",
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
    // todo: send rescheduling email
    const {
      body: data,
      params: { appointmentId },
    } = req;
    const { id, name, email } = await getUser(req);
    delete data.id;
    delete data.contact;
    const appointment = await prisma.appointment.update({
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
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: appointment.profileId,
      },
    });
    if (appointment) {
      const message = {
        from: process.env.EMAIL_FROM,
        to: profile.email,
        subject: "Appointment Rescheduled",
        html: `
        <h4>Appointment Rescheduled</h4>
        <p> You have rescheduled an appointment with ${name}</p>
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
            transmissionType: "Rescheduled",
            clientType: profile.stage,
            profileId: profile.id,
          },
        });
        console.log("Transmission Created: ", transmission);
      }
    }
    res.send({ error: false, message: "Appointment updated" });
  } catch (error) {
    next(error);
  }
});

appointmentRouter.put("/cancel/:appointmentId", async (req, res, next) => {
  try {
    const { id, email, name } = await getUser(req);
    const { appointmentId } = req.params;
    const data = req.body;
    const appointment = await prisma.appointment.update({
      where: {
        id: +appointmentId,
      },
      data: {
        isCancelled: true,
        profile: {
          connect: {
            id: +data.profile.id,
          },
        },
        user: {
          connect: {
            id,
          },
        },
      },
    });
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: appointment.profileId,
      },
    });
    if (appointment) {
      const message = {
        from: process.env.EMAIL_FROM,
        to: profile.email,
        subject: "Appointment Cancelled",
        html: `
      <h4>Appointment Cancelled</h4>
      <p> Your appointment on: ${appointment.dateTime} has been cancelled</p>
      <p>Please email ${email} to schedule a new appointment or for any questions</p>
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
            clientType: profile.stage,
            transmissionType: "Cancelled",
            profileId: profile.id,
          },
        });
        console.log("Transmission Created: ", transmission);

        res.send({ error: false, message: "Appointment Cancelled" });
      }
    }
  } catch (error) {
    next(error);
  }
});

appointmentRouter.delete("/:appointmentId", async (req, res, next) => {
  try {
    // TODO: send cancel appointment email
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
