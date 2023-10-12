const {
  login,
  loginToken,
  loginWithoutPasswd,
  logout,
  getStatus,
  sendMailAccess,
} = require("controllers/sessions");

const tokens = require("./tokens");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", getStatus);
  router.post("/no-password", sendMailAccess);
  router.put("/no-password", loginWithoutPasswd);
  router.put("/", login);
  router.post("/:id", loginToken);
  router.delete("/", logout);
  router.use("/tokens", tokens({ Router }));
  return router;
};
