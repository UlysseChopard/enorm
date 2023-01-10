const { login, logout, getStatus } = require("../controllers/sessions");

module.exports = (router) => {
  router.get("/", getStatus);
  router.put("/", login);
  router.delete("/", logout);
  return router;
};
