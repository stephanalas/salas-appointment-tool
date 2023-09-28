// setup node mailer transporter
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  // secure: false,
});

export default transporter;
