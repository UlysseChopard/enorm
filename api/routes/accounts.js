const { get, create, update, close } = require("../controllers/accounts");

module.exports = (router) => {
  router.post("/", create);
  router.get("/", get);
  router.put("/", update);
  router.delete("/", close);
  return router;
};
