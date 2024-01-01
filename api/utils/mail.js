const postmark = require("postmark");
module.exports = new postmark.ServerClient(process.env.POSTMARK_TOKEN);
