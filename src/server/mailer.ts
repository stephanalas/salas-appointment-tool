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

console.log("this is transporter", transporter);

async function sendTestMail() {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.TEST_EMAIL,
      subject: "Test email",
      text: "testing email from nodemailer",
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    console.log(info.envelope);
    console.log("accepted", info.accepted);
    console.log("pending", info.pending);
    console.log("rejected", info.rejected);
  } catch (error) {
    console.error(error);
  }
}

// sendTestMail();
export default transporter;
