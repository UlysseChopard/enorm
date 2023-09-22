const { crypt } = require("utils");
const { Accounts, Organisations, OrganisationsMembers } = require("models");

exports.get = async (req, res, next) => {
  try {
    const { rows: organisationsMembers } = await OrganisationsMembers.getAll();
    res.json({ organisationsMembers });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(422).json({ message: "missing email key" });
    }
    const {
      rows: [account],
    } = await Accounts.create({
      ...req.body,
      hash: crypt.encrypt("Bienvenue!"),
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
    res.status(201).json({ account, organisation, organisationMember });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { rows: organisationsMembers } =
      await OrganisationsMembers.removeByOrganisation(req.params.id);
    const {
      rows: [organisation],
    } = await Organisations.remove(req.params.id);
    const { rows: accounts } = await Accounts.removeMany(
      organisationsMembers
        .map((om) => om.account)
        .filter((account) => !!account)
    );
    res.json({ organisation, organisationsMembers, accounts });
  } catch (err) {
    next(err);
  }
};
