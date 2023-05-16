const { Registrations, WGPaths, RegistrationsStreams } = require("../models");

exports.accept = async (req, res, next) => {
  try {
    const {
      rows: [wg],
    } = await Registrations.getWG(req.params.id);
    if (wg.admin === res.locals.userId) {
      await Registrations.accept(req.params.id);
      return res.json({ message: `Registration ${req.params.id} created` });
    }
    const {
      rows: [registrationStream],
    } = await RegistrationsStreams.forward(req.params.id, req.body.wgPath);
    res.status(201).json({ registrationStream });
  } catch (err) {
    next(err);
  }
};

exports.deny = async (req, res, next) => {
  try {
    const {
      rows: [registration],
    } = await Registrations.deny(req.params.id);
    res.json({ registration });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { rows: sended } = await Registrations.getSended(res.locals.userId);
    const { rows: received } = await RegistrationsStreams.getReceived(
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
      rows: [wgPath],
    } = await WGPaths.getById(req.body.wgPath);
    const {
      rows: [registration],
    } = await Registrations.create({
      beneficiary: res.locals.userId,
      workingGroup: wgPath.working_group,
    });
    const {
      rows: [registrationStream],
    } = await RegistrationsStreams.forward(registration.id, req.body.wgPath);
    res.status(201).json({ registration, registrationStream });
  } catch (err) {
    next(err);
  }
};
