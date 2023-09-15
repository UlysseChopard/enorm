const { crypt } = require("utils");
const { Accounts, OrganisationsMembers, Organisations } = require("models");

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.getById(res.locals.accountId);
    if (!account) return res.status(401).json({ message: "Account not found" });
    delete account.hash;
    const { rows: users } = await OrganisationsMembers.getByEmail(account.email);
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
    if (!req.body.token) {
      return res.status(422).json({ message: "missing token" });
    }
    if (!req.body.password) {
      return res.status(422).json({ message: "missing password" });
    }
    const {
      rows: [verified],
    } = await OrganisationsMembers.checkToken(req.params.token);
    if (!verified) {
      return res.status(401).json({ message: "invalid token" });
    }
    const hash = crypt.encrypt(req.body.password);
    const {
      rows: [account],
    } = await Accounts.create({ ...req.body, email: verified.email, hash });
    delete account.hash;
    const {
      rows: [user],
    } = await OrganisationsMembers.joinByToken(account.id, req.body.token);
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
