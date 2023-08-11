const { get, create, update, close } = require("../controllers/accounts");

const isAccountOwner = (req, res, next) =>
  req.params.id === res.locals.accountId
    ? next()
    : res
        .status(401)
        .json({ message: "Only account owner can modify its account" });

module.exports = (router) => {
  router.post("/", create);
  router.get("/:id", isAccountOwner, get);
  router.patch("/:id", isAccountOwner, update);
  router.delete("/:id", isAccountOwner, close);
  return router;
};
