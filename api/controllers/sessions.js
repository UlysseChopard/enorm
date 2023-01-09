const { v4: uuidV4 } = require("uuid");
const { crypt, jwt } = require("../utils");
const { Accounts } = require("../models");

exports.login = async (req, res, next) => {
  try {
    const { rows: [account] } = await Accounts.getByEmail(req.body.email);
    const isCorrectPassword = await crypt.compare(req.body.password, account.hash);
    if (!isCorrectPassword) return res.sendStatus(401);
    const uuid = uuidV4();
    const token = jwt.sign({ uuid });
    res.cookie(jwt.key, token, { httpOnly: true, maxAge: jwt.maxAge, secure: process.env.NODE === "production" });
    res.json({ token }); 
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  res.cookie(jwt.key, "", { maxAge: "1" });
  res.json({ message: "logged out" });
};

exports.getStatus = (_req, res) => res.json({ status: "authenticated" });
