const { get, create, update, remove } = require("../controllers/companies");

module.exports = (router) => {
  router.post("/", create);
  router.put("/", update);
  router.delete("/", remove);
  router.get("/", get);
  return router;
};
