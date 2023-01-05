const { v4: uuidV4 } = require("uuid");
const { crypt, jwt } = require("../utils");
const { Accounts, Sessions } = require("../models");

exports.login = async (req, res, next) => {
  try {
    const account = await Accounts.getByEmail(req.body.email);
    const isCorrectPassword = await crypt.compare(req.body.password, account.hash);
    if (!isCorrectPassword) return res.sendStatus(401);
    const uuid = uuidV4();
    const session = await Sessions.setUuid(account.id, uuid);
    const token = jwt.sign({ uuid });
    res.cookie(jwt.key, token, { httpOnly: true, maxAge: jwt.maxAge, secure: process.env.NODE === "production" });
    res.json({ session }); 
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  const { uuid } = jwt.verify(req.cookies[jwt.key]);
  const session = await Sessions.destroy(uuid);
  res.cookie(jwt.key, "", { maxAge: "1" });
  res.json({ session });
};
