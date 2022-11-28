const {
  getReceived,
  getSent,
  send,
  cancel,
  allow,
  block,
} = require("../middlewares/subscriptions");

module.exports = (router) => {
  router.get("/received", getReceived);
  router.get("/sent", getSent);
  router.put("/:wg/:path", send);
  router.delete("/:wg/:path", cancel);
  router.put("/:id", allow);
  router.delete("/:id", block);
};
