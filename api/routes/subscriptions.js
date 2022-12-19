const {
  getReceived,
  getSent,
  send,
  cancel,
  accept,
  deny,
} = require("../controllers/subscriptions");

module.exports = (router) => {
  router.get("/received", getReceived);
  router.get("/sent", getSent);
  router.put("/:wg/:path", send);
  router.delete("/:wg/:path", cancel);
  router.put("/:id", accept);
  router.delete("/:id", deny);
};
