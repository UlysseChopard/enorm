const { crypt } = require("utils");
const { Accounts } = require("models");

exports.get = async (req, res, next) => {
  try {
    const { rows: superusers } = await Accounts.getSuperusers();
    return res.json({ superusers });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(422).json({ message: "missing email" });
    }
    if (!req.body.password) {
      return res.status(422).json({ message: "missing password" });
    }
    const hash = crypt.encrypt(req.body.email);
    const {
      rows: [superuser],
    } = await Accounts.create({ ...req.body, hash, superuser: true });
    if (!superuser) {
      return res.status(404).json({ message: "superuser not found" });
    }
    res.status(201).json({ superuser });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [superuser],
    } = await Accounts.remove(req.params.id);
    if (!superuser) {
      return res.status(404).json({ message: "superuser not found" });
    }
    res.json({ superuser });
  } catch (err) {
    next(err);
  }
};
