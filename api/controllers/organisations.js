const log = require("../utils/logs");
const Organisations = require("../models/organisations");
const Users = require("../models/users");

exports.create = async (req, res, next) => {
  try {
    const { name, address, parent } = req.body;
    const manager = req.user.id;
    const parentOrganisation = parent || req.user.organisation;
    if (parentOrganisation) {
      await Organisations.createChild(manager, {
        name,
        address,
        parent: parentOrganisation,
      });
    } else {
      const {
        rows: [organisation],
      } = await Organisations.createParent(manager, { name, address });
      await Users.updateOrganisation(manager, {
        organisation: organisation.id,
      });
    }
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { rows } = await Organisations.getByManager(req.user.id);
    res.json({ organisations: rows });
  } catch (err) {
    next(err);
  }
};
