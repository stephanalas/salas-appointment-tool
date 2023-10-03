// setup node mailer transporter
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  // secure: false,
});

export default transporter;
