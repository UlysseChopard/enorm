const { jwt } = require("../utils");

module.exports = (req, res, next) => {
  const token = req.cookies[jwt.key];
  if (!token) return next();
  try {
    const decoded = jwt.verify(token); 
    if (!decoded) return next();
    res.locals.userId = decoded.uuid;
    next();
  } catch (err) {
    next(err);
  }
};
