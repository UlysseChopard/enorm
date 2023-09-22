const { crypt } = require("utils");
const { Accounts, Organisations, OrganisationsMembers } = require("models");

exports.setSuperuser = async (req, res, next) => {
  try {
    if (!req.body.account)
      return res.status(422).json({ message: "Missing account key in body" });
    const {
      rows: [superuser],
    } = await Accounts.setSuperuser(req.params.id, true);
    if (!superuser)
      return res.status(404).json({ message: "superuser not found" });
    res.json({ superuser });
  } catch (err) {
    next(err);
  }
};

exports.unsetSuperuser = async (req, res, next) => {
  try {
    const {
      rows: [superuser],
    } = await Accounts.setSuperuser(req.params.id, false);
    if (!superuser)
      return res.status(404).json({ message: "superuser not found" });
    res.json({ superuser });
  } catch (err) {
    next(err);
  }
};

exports.createOrganisation = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.create({
      ...req.body,
      hash: crypt.encrypt(new Date().toISOString()),
    });
    if (!account) {
      return res
        .status(500)
        .json({ message: "an error occurred while creating account" });
    }
    const {
      rows: [organisation],
    } = await Organisations.create(account.id);
    if (!organisation) {
      return res
        .status(500)
        .json({ message: "an error occurred while creating organisation" });
    }
    const {
      rows: [organisationMember],
    } = await OrganisationsMembers.create(
      organisation.id,
      account.email,
      account.id
    );
    if (!organisationMember) {
      return res.status(500).json({
        message: "an error occurred while creating organisation member",
      });
    }
    res.json({ account, organisation, organisationMember });
  } catch (err) {
    next(err);
  }
};

exports.get = async (_req, res, next) => {
  try {
    const { rows: superusers } = Accounts.getSuperusers();
    const { rows: organisations } = Organisations.getAll();
    return res.json({ superusers, organisations });
  } catch (err) {
    next(err);
  }
};
