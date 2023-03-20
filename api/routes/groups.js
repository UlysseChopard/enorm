const { get, create } = require("../controllers/groups");

module.exports = router => {
  router.get("/", get);
  router.post("/", create);
  return router;
};
