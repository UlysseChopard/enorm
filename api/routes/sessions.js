const {
  login,
  loginWithoutPasswd,
  logout,
  getStatus,
  sendMailAccess,
} = require("../controllers/sessions");

module.exports = (router) => {
  router.get("/", getStatus);
  router.post("/no-password", sendMailAccess);
  router.put("/no-password", loginWithoutPasswd);
  router.put("/", login);
  router.delete("/", logout);
  return router;
};
