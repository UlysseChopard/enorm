const { get, show } = require("../middlewares/paths");

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", show);
};
