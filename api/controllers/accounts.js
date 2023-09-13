const { crypt } = require("../utils");
const { Accounts, Users, Organisations } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.getById(res.locals.accountId);
    if (!account) return res.status(401).json({ message: "Account not found" });
    delete account.hash;
    const { rows: users } = await Users.getByEmail(account.email);
    res.json({ account, users });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      rows: [prev],
    } = await Accounts.getById(res.locals.accountId);
    const hash = req.body.password
      ? crypt.encrypt(req.body.password)
      : prev.hash;
    const {
      rows: [account],
    } = await Accounts.update(res.locals.accountId, {
      ...prev,
      ...req.body,
      hash,
    });
    delete account.hash;
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (req.params?.token) {
      const {
        rows: [user],
      } = await Users.checkToken(req.params.token);
      if (!user) {
        return res.status(404).json({ message: "User token does not exist" });
      }
    }
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({ message: "Missing property" });
    }
    const hash = crypt.encrypt(password);
    const {
      rows: [account],
    } = await Accounts.create({ ...req.body, hash });
    delete account.hash;
    if (!req.params?.token) {
      const {
        rows: [organisation],
      } = await Organisations.create(account.id);
      const {
        rows: [user],
      } = await Users.create(organisation.id, email, account.id);
      return res.status(201).json({ user, organisation, account });
    }
    const {
      rows: [user],
    } = await Users.join(account.id, { email, token: req.params.token });
    res.status(201).json({ user, account });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.close(res.locals.accountId);
    res.json({ account });
  } catch (err) {
    next(err);
  }
};
