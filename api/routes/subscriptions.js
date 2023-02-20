const { get, invite } = require("../controllers/subscriptions");

module.exports = (router) => {
  router.get("/", get);
  router.put("/:recipient", invite);
  return router;
};
