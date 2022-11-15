// const log = require("../utils/logs");
const Roles = require("../models/roles");
const Users = require("../models/users");
const { sendInvitation } = require("../utils/emails");

const save = async (email, sender) => {
  if (!email) return;
  const {
    rows: [user],
  } = await Users.getByEmail(email);
  if (!user) {
    await sendInvitation({ to: email, link: process.env.WEB_URL });
  }
  await Roles.save({ sender, email, user: user?.id });
};

exports.declare = async (req, res, next) => {
  try {
    const { emails } = req.body;
    const emailsArr = emails.split(" ");
    await Promise.all(emailsArr((email) => save(email, req.user.id)));
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { rows: roles } = await Roles.get(req.user.id);
    res.json({ roles });
  } catch (err) {
    next(err);
  }
};

exports.del = async (req, res, next) => {
  try {
    const { email } = req.body;
    await Roles.deleteByEmailAndSender({ email, sender: req.user.id });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
