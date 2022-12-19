const { login, logout } = require("../controllers/sessions");

module.exports = (router) => {
  router.put("/", login);
  router.delete("/", logout);
};
