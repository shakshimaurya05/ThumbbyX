import { sendEmail }
from "../services/emailService.js";

export const sendTestEmail =
  async (req, res) => {
    try {
      await sendEmail({
        to: process.env.MAIL_USER,

        subject:
          "ThumbbyX Email Test",

        html: `
          <h2>Email Working 🎉</h2>
          <p>This email was sent from ThumbbyX Backend.</p>
        `,
      });

      return res.status(200).json({
        success: true,
        message:
          "Test email sent",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };