import nodemailer from "nodemailer";
import formatMessage from "../helpers/formatMessage.js";

const emailController = () => {
  return {
    async getData(req, res) {
      try {
        const { name, email, phoneNumber, message } = req.body;
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: process.env.EMAIL_TO,
          subject: "New Message from Contact Form",
          html: formatMessage(name, email, phoneNumber, message),
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
            return res.status(200).json({ status: "Success", message: "Email sent" });
          }
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
  };
};

export default emailController;