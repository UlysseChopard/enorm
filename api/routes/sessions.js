const { login, logout, register } = require("../controllers/sessions");

module.exports = (router) => {
  router.post("/", register);
  router.put("/", login);
  router.delete("/", logout);
};
