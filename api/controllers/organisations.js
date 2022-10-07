const log = require("../utils/logs");
const Organisations = require("../models/organisations");

exports.create = async (req, res) => {
  try {
    const { name, address, parent } = req.body;
    const manager = req.user.id;
    if (parent) {
      await Organisations.createChild(manager, { name, address, parent });
    } else {
      await Organisations.createParent(manager, { name, address });
    }
    res.sendStatus(201);
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { rows } = await Organisations.getAll(req.user.id);
    res.json({ organisations: rows });
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};
