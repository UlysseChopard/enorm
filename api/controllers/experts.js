const log = require("../utils/logs");
const { createExpert } = require("../models/experts");

exports.fillProfile = async (req, res) => {
  try {
    await createExpert(req.user.id, { description: req.description });
    res.sendStatus(201);
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};
