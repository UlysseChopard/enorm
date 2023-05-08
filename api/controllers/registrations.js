const { Registrations, WorkingGroups, Subscriptions } = require("../models");

exports.accept = async (req, res, next) => {
  try {
    const {
      rows: [wg],
    } = await Registrations.getWG(req.params.id);
    if (wg.admin === res.locals.userId) {
      await Registrations.accept(req.params.id);
      res.sendStatus(204);
    }
    await Registrations.forward(req.body.wgPath, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.deny = async (req, res, next) => {
  try {
    await Registrations.deny(req.params.id);
    res.json({ message: `Registration ${req.params.id} successfully denied` });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { rows: sended } = await Registrations.getSended(res.locals.userId);
    const { rows: received } = await Registrations.getReceived(
      res.locals.userId
    );
    res.json({ sended, received });
  } catch (err) {
    next(err);
  }
};

exports.request = async (req, res, next) => {
  try {
    const {
      rows: [registration],
    } = await Registrations.request({
      beneficiary: res.locals.userId,
      workingGroup: req.body.group,
      decisionMaker: req.body.decisionMaker,
    });
    res.status(201).json({ registration });
  } catch (err) {
    next(err);
  }
};
