import "dotenv/config";
import nodemailer from "nodemailer";
const transporter =
  nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,

    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  await transporter.sendMail({
    from: `"ThumbbyX" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};