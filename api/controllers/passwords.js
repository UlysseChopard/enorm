const { v4: UUIDv4 } = require("uuid");
const { crypt, mail } = require("../utils");
const { Passwords } = require("../models");

exports.change = async (req, res, next) => {
  try {
    const password = await Passwords.getById(req.params.id);
    const matchPrev  = await crypt.compare(req.body.previous, password.hash);
    if (!matchPrev) return res.sendStatus(403);
    const hash = await crypt.hash(req.body.password);
    await Passwords.change(req.params.id, hash);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.sendResetLink = async (req, res, next) => {
  try {
    const uuid = UUIDv4();
    const password = await Passwords.setUuid(req.params.id, uuid);
    const link = `${process.env.WEB_URL}/passwords/${uuid}`;
    await mail.sendResetLink(password.email, link);
    res.sendStatus(200); 
  } catch (err) {
    next(err);
  }
};

exports.reset = async (req, res, next) => {
  try {
    const hash = await crypt.hash(req.body.password);
    await Passwords.resetPassword(req.params.uuid, hash);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
