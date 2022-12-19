const { get, getAll } = require("../controllers/paths");

module.exports = (router) => {
  router.get("/", getAll);
  router.get("/:id", get);
};
