const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport("SMTP", {
  // [1]
  service: "Gmail",
  auth: {
    user: "gmail.user@gmail.com",
    pass: "userpass",
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
