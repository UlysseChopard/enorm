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
    const hash = crypt.encrypt("Bienvenue");
    const {
      rows: [account],
    } = await Accounts.create({ ...req.body, hash, superuser: true });
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }
    res.status(201).json({ account });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.remove(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }
    res.json({ account });
  } catch (err) {
    next(err);
  }
};
