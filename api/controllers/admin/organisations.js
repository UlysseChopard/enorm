const { Organisations, OrganisationsMembers, Accounts } = require("models");

exports.get = async (req, res, next) => {
  try {
    const { rows: organisations } = await Organisations.get();
    res.json({ organisations });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.body.account) {
      return res.status(422).json({ message: "missing account in body" });
    }
    const {
      rows: [account],
    } = await Accounts.get(req.body.account);
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }
    const {
      rows: [organisation],
    } = await Organisations.create(req.body.account);
    if (!organisation) {
      return res
        .status(500)
        .json({ message: "an error occurred while creating organisation" });
    }
    const {
      rows: [member],
    } = await OrganisationsMembers.create({
      organisation: organisation.id,
      email: account.email,
      account: account.id,
      isAdmin: true,
    });
    if (!member) {
      return res
        .status(500)
        .json({ message: "could not create first member of organisation" });
    }
    res.status(201).json({ organisation });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.remove(req.params.id);
    await Accounts.removeOrphans();
    res.json({ organisation });
  } catch (err) {
    next(err);
  }
};
