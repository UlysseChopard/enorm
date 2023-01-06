const { jwt } = require("../utils");

module.exports = (roles) => (req, res, next) => {
  const token = req.cookies[jwt.key];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token); 
    if (!decoded) return res.sendStatus(401);
    if (roles && !roles.includes(decoded.role)) return res.sendStatus(403);
    next();
  } catch (err) {
    next(err);
  }
};
