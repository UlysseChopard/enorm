const { Registrations, WGPaths, RegistrationsStreams } = require("models");

exports.accept = async (req, res, next) => {
  try {
    const {
      rows: [wg],
    } = await Registrations.getWG(req.params.id);
    if (wg.admin === res.locals.accountId) {
      await Registrations.accept(req.params.id);
      return res.json({ message: `Registration ${req.params.id} created` });
    }
    if (!req.body.wgPath) {
      return res.status(422).json({ message: "Missing wgPath in body" });
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
    if (registration.beneficiary === res.locals.accountId) {
      await Registrations.remove(res.locals.accountId, req.params.id);
      return res.json({ registration, deleted: true });
    }
    res.json({ registration });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { rows: sent } = await Registrations.getSent(res.locals.accountId);
    const { rows: received } = await RegistrationsStreams.getReceived(
      req.params.organisation
    );
    res.json({ sent, received });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      rows: [registration],
    } = await Registrations.create({
      beneficiary: req.body.account,
      wgPath: req.body.wgPath,
    });
    const {
      rows: [registrationStream],
    } = await RegistrationsStreams.forward(registration.id, req.body.wgPath);
    if (!registrationStream) {
      return res
        .status(500)
        .json({ message: "Could not create registration stream" });
    }
    res.status(201).json({ registration });
  } catch (err) {
    next(err);
  }
};

exports.find = async (req, res, next) => {
  try {
    const {
      rows: [registration],
    } = await Registrations.find(req.params.id);
    const { rows: wgPaths } = await WGPaths.find(
      req.params.organisation,
      registration.working_group
    );
    const requireAction =
      registration.beneficiary !== res.locals.accountId &&
      !registration.denied_at &&
      !registration.accepted_at;
    res.json({ registration, wgPaths, requireAction });
  } catch (err) {
    next(err);
  }
};
