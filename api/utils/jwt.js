const jwt = require("jsonwebtoken");

module.exports = {
  sign: (infos, maxAge = process.env.JWT_MAX_AGE) =>
    jwt.sign(infos, process.env.JWT_SECRET, { expiresIn: maxAge }),
  verify: (token) => jwt.verify(token, process.env.JWT_SECRET),
  maxAge: process.env.JWT_MAX_AGE,
  key: "jwt",
};
