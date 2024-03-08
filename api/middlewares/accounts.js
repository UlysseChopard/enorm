exports.isAccountOwner = (req, res, next) =>
  req.params.id === res.locals.accountId
    ? next()
    : res
        .status(403)
        .json({ message: "Only account owner can modify its account" });
