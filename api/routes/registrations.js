const { get } = require("../controllers/registrations");

module.exports = router => {
  router.get("/", get);
  return router;
};
