const {
  login,
  logout,
  getStatus,
  sendMailAccess,
} = require("../controllers/sessions");

module.exports = (router) => {
  router.get("/", getStatus);
  router.post("/no-password", sendMailAccess);
  router.put("/", login);
  router.delete("/", logout);
  return router;
};
