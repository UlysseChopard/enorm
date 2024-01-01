exports.send = new require("postmark").ServerClient(
  process.env.POSTMARK_TOKEN
).sendEmail;
