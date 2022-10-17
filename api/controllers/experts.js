const { v4: uuidv4 } = require("uuid");
const log = require("../utils/logs");
const Users = require("../models/users");
const { sendInvitation } = require("../utils/emails");

exports.fillProfile = async (req, res, next) => {
  try {
    await Users.updateDescription(req.user.id, {
      description: req.description,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

exports.declareExpert = async (req, res, next) => {
  try {
    const { email, organisation, manager } = req.body;
    const uuid = uuidv4();
    await Users.createExpertAccount({
      email,
      organisation,
      manager,
      uuid,
    });
    log.info("Expert account created", { email, organisation, manager });
    const link = encodeURI(`${process.env.WEB_URL}/signup/${uuid}`);
    log.info({ link });
    sendInvitation({
      from: `${req.user.first_name} ${req.user.last_name} <${req.user.email}>`,
      to: email,
      link,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { rows: experts } = await Users.getByManager(req.user.id);
    res.json({ experts });
  } catch (err) {
    next(err);
  }
};
