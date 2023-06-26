const { get, create, close } = require("../controllers/establishments");

module.exports = (router) => {
  router.post("/", create);
  router.get("/", get);
  router.delete("/", close);
  return router;
};
