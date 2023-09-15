const { jwt } = require("utils");

module.exports = (req, res, next) => {
  const token =
    req.cookies[jwt.key] || req.headers.authorization?.split(" ")[1];
  if (!token) return next();
  try {
    res.locals = jwt.verify(token);
    next();
  } catch (err) {
    if (err.expiredAt) return next();
    next(err);
  }
};
