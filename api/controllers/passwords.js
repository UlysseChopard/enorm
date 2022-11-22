const { v4: uuidv4 } = require("uuid");
const { verify, hash } = require("../utils/auth");
// const log = require("../utils/logs");
const Users = require("../models/users");
const { sendMagicLink } = require("../utils/emails");

exports.updatePassword = async (req, res, next) => {
  try {
    const { oldpass, newpass } = req.body;
    const correctOldPass = await verify(oldpass, req.user.password);
    if (correctOldPass) {
      const newPassHashed = await hash(newpass);
      await Users.updatePassword(req.user.id, newPassHashed);
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
};

exports.sendResetPasswordLink = async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await Users.getByEmail(req.body.email);
    if (!user) return res.sendStatus(403);
    const uuid = uuidv4();
    await Users.updateUUID(user.id, uuid);
    await sendMagicLink({ to: user.email, uuid });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await Users.getByUUID(req.body.uuid);
    if (!user) return res.sendStatus(403);
    const hashedPassword = await hash(req.body.password);
    const uuid = uuidv4();
    await Users.resetPassword(req.body.uuid, { hash: hashedPassword, uuid });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
