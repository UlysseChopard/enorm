const jwt = require("jsonwebtoken");

module.exports = {
  sign: (infos) => jwt.sign(infos, process.env.JWT_SECRET, { expiresIn: process.env.JWT_MAX_AGE }),
  verify: (token) => jwt.verify(token, process.env.JWT_SECRET),
  maxAge: process.env.JWT_MAX_AGE,
  key: "jwt",
};
