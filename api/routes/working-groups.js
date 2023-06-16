const { get, create, find, remove } = require("../controllers/working-groups");

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", find);
  router.delete("/:id", remove);
  router.post("/", create);
  return router;
};
