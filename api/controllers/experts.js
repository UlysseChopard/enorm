const log = require("../utils/logs");
const Experts = require("../models/experts");
const Users = require("../models/users");

exports.fillProfile = async (req, res) => {
  try {
    await Experts.fillProfile(req.user.id, { description: req.description });
    res.sendStatus(201);
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};

exports.declareExpert = async (req, res) => {
  try {
    const { email, organisation } = req.body;
    await Users.declareExpert({
      email,
      organisation,
    });
    res.sendStatus(201);
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};
