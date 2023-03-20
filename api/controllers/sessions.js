const { crypt, jwt } = require("../utils");
const { Accounts } = require("../models");

exports.login = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.getByEmail(req.body.email);
    if (!account) return res.sendStatus(401);
    const isCorrectPassword = await crypt.compare(
      req.body.password,
      account.hash
    );
    if (!isCorrectPassword) return res.sendStatus(401);
    const token = jwt.sign({ uuid: account.id });
    res.cookie(jwt.key, token, {
      httpOnly: true,
      maxAge: jwt.maxAge,
      secure: process.env.NODE === "production",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  res.cookie(jwt.key, "", { maxAge: "1" });
  res.json({ message: "logged out" });
};

exports.getStatus = (_req, res) =>
  res.locals.userId
    ? res.json({ status: "authenticated" })
    : res.status(401).json({ status: "unauthenticated" });
