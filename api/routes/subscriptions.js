const { search } = require("../controllers/subscriptions");

module.exports = (router) => {
  router.get("/", search);
  return router;
};
