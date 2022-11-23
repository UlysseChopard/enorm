exports.isAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated());
  req.isAuthenticated() ? next() : res.sendStatus(401);
};

exports.isActivated = (req, res, next) =>
  req.user?.is_activated ? next() : res.sendStatus(403);
