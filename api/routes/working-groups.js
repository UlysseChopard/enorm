const { get, create, find } = require("../controllers/working-groups");

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", find);
  router.post("/", create);
  return router;
};
