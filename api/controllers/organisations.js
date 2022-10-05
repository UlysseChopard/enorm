const log = require("../utils/logs");
const Organisations = require("../models/organisations");

exports.create = async (req, res) => {
  try {
    const { name, address, parent } = req.body;
    if (parent) {
      await Organisations.createChild({ name, address, parent });
    } else {
      await Organisations.createParent({ name, address });
    }
    res.sendStatus(201);
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};

exports.getAll = async (_req, res) => {
  try {
    const { rows } = await Organisations.getAll();
    res.json({ organisations: rows });
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};
