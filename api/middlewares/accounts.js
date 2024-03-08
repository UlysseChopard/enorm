const { isSuperuser } = require("middlewares");

exports.isSuperuser = isSuperuser;

exports.isAccountOwner = (req, res, next) =>
  req.params.id === res.locals.accountId
    ? next()
    : res
        .status(403)
        .json({ message: "Only account owner can modify its account" });
