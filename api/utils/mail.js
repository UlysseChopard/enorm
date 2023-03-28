const nodemailer = require("nodemailer");
const { EMAIL_HOST, EMAIL_FROM, EMAIL_USER, EMAIL_PASS, EMAIL_PORT } =
  process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

exports.sendResetLink = ({ recipient, subject, header, body }) => {
  return transporter.sendMail({
    from: EMAIL_FROM,
    to: recipient,
    subject,
    text: `${header}\n\n${body}`,
  });
};
