const { search } = require("../controllers/accounts");

module.exports = (router) => {
  router.get("/", search);
  return router;
};
