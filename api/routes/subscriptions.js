const { search, invite } = require("../controllers/subscriptions");

module.exports = (router) => {
  router.get("/", search);
  router.put("/:recipient", invite);
  return router;
};
