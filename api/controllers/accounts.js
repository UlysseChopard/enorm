const { crypt } = require("../utils");
const { Accounts, Companies } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.getById(res.locals.userId);
    if (!account) return res.status(401).json({ message: "Account not found" });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      rows: [prev],
    } = await Accounts.getById(res.locals.userId);
    if (req.body.newPassword || req.body.oldPassword) {
      if (!req.body.oldPassword)
        return res.status(400).json({ message: "Missing old password" });
      if (!req.body.newPassword)
        return res.status(400).json({ message: "Missing new password" });
      if (!req.body.oldPassword === crypt.decrypt(prev.hash))
        return res.sendStatus(401);
      req.body.hash = crypt.encrypt(req.body.password);
      delete req.body.oldPassword;
      delete req.body.newPassword;
    }
    const {
      rows: [account],
    } = await Accounts.update(res.locals.userId, { ...prev, ...req.body });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { email, password, company } = req.body;
    if (!password || !email || !company) {
      return res.status(400).json({ message: "Missing property" });
    }
    const hash = crypt.encrypt(password);
    const {
      rows: [account],
    } = await Accounts.create({ ...req.body, hash });
    await Companies.create({ name: company, creator: account.id });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.close(res.locals.userId);
    res.json({ account });
  } catch (err) {
    next(err);
  }
};
