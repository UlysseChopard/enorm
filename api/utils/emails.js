const nodemailer = require("nodemailer");
const log = require("./logs.js");

const transport = nodemailer.createTransport({
  host: "smtp.laposte.net",
  port: 465,
  secure: true,
  auth: {
    user: "ulysse.chopard",
    pass: process.env.MAIL_PASS,
  },
});

if (process.env.NODE_ENV === "production") {
  // [2]
  process.on("uncaughtException", function (er) {
    console.error(er.stack); // [3]
    transport.sendMail(
      {
        from: "alerts@mycompany.com",
        to: "alert@mycompany.com",
        subject: er.message,
        text: er.stack, // [4]
      },
      function (er) {
        if (er) console.error(er);
        process.exit(1); // [5]
      }
    );
  });
}

exports.sendMail = ({ from, to, subject, text }) =>
  transport.sendMail(
    {
      from,
      to,
      subject,
      text,
    },
    (err) => {
      log.warn({ err });
    }
  );

exports.sendInvitation = ({ from, to, link }) => {
  transport.sendMail(
    {
      from,
      to,
      subject: "You have been invited to join E-norm",
      text: `Please click here to create your account : ${link}`,
      html: `<p>Please click <a href=${link}>here</a> to create your account</p>`,
    },
    (err) => log.warn({ err })
  );
};

exports.sendVerification = ({ to, link }) => {
  transport.sendMail({
    from: "E-norm <ulysse.chopard@laposte.net>",
    to,
    subject: "Please activate your account",
    text: `To activate your account, please click here : ${link}`,
    html: `<p>To activate your account please click <a href=${link}>here</a></p>`,
  });
};
