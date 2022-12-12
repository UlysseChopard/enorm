const { jwt } = require("../utils");

exports.isAuthenticated = ({ role, roles }) => (req, res, next) => {
  const token = req.cookie[jwt.key];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token); 
    if (!decoded) return res.sendStatus(401);
    if (role && decoded.role !== role) return res.sendStatus(403);
    if (roles && !roles.includes(decoded.role)) return res.sendStatus(403);
    return next();
  } catch (err) {
    next (err);
  }
};
