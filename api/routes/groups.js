const { get, create, getById, join } = require("../controllers/groups");

module.exports = (router) => {
  router.get("/", get);
  router.post("/", create);
  router.get("/:id", getById);
  router.post("/:id", join);
  return router;
};
