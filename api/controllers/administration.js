const { crypt } = require("utils");
const {
  Administration,
  Accounts,
  Organisations,
  OrganisationsMembers,
} = require("models");

exports.addSuperuser = async (req, res, next) => {
  try {
    if (!req.body.account)
      return res.status(422).json({ message: "Missing account key in body" });
    const {
      rows: [superuser],
    } = await Administration.addSuperuser(req.body.account);
    if (!superuser)
      return res.status(404).json({ message: "superuser not found" });
    res.json({ superuser });
  } catch (err) {
    next(err);
  }
};

exports.removeSuperuser = async (req, res, next) => {
  try {
    const {
      rows: [superuser],
    } = await Administration.removeSuperuser(req.params.id);
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
