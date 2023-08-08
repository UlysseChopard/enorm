const {
  get,
  create,
  update,
  close,
  join,
  leave,
} = require("../controllers/accounts");

const isUser = (req, res, next) =>
  req.params.id === res.locals.accountId
    ? next()
    : res
        .status(401)
        .json({ message: "Only account owner can modify its account" });

module.exports = (router) => {
  router.post("/", create);
  router.get("/:id", isUser, get);
  router.patch("/:id", isUser, update);
  router.delete("/:id", isUser, close);
  router.put("/:id/users/:userId", isUser, join);
  router.delete("/:id/users/:userId", isUser, leave);
  return router;
};
