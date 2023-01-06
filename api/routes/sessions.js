const isAuthenticated = require("../middlewares/auth");
const { login, logout, getStatus } = require("../controllers/sessions");

module.exports = (router) => {
  router.get("/", isAuthenticated(), getStatus);
  router.put("/", login);
  router.delete("/", logout);
  return router;
};
