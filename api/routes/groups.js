const { get, create, getById } = require("../controllers/groups");

module.exports = (router) => {
  router.get("/", get);
  router.post("/", create);
  router.get("/:id", getById);
  return router;
};
