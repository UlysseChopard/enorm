const { Registrations, WGPaths, RegistrationsStreams } = require("models");

const findManager = async (registration, user) => {
  const { rows: managers } = await RegistrationsStreams.managers(registration);
  return managers.find(({ account }) => account === user);
};

exports.accept = async (req, res, next) => {
  try {
    if (!req.body.wgPath) {
      return res.status(422).json({ message: "Missing wgPath in body" });
    }
    const manager = await findManager(req.params.id, res.locals.userId);
    if (!manager) {
      return res
        .status(403)
        .json({ message: "Not a subscription manager for this registration" });
    }
    if (manager.organisation === manager.end_organisation) {
      const {
        row: [registration],
      } = await Registrations.accept(req.params.id);
      return res.status(201).json({ registration });
    }
    const {
      rows: [stream],
    } = await RegistrationsStreams.forward(req.params.id, req.body.wgPath);
    const {
      rows: [registration],
    } = await Registrations.find(req.params.id);
    registration.stream = stream;
    res.status(201).json({ registration });
  } catch (err) {
    next(err);
  }
};

exports.deny = async (req, res, next) => {
  try {
    const manager = await findManager(req.params.id, res.locals.accountId);
    if (!manager) {
      return res
        .status(403)
        .json({ message: "Not a subscription manager for this registration" });
    }
    const {
      rows: [registration],
    } = await Registrations.deny(req.params.id);
    if (registration.beneficiary === res.locals.accountId) {
      await Registrations.remove(res.locals.accountId, req.params.id);
      return res.json({ registration: null });
    }
    res.json({ registration });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { rows: received } = await Registrations.getFromManagedSubscriptions(
      res.locals.accountId,
    );
    const { rows: sent } = await Registrations.getOwn(
      req.params.organisation,
    );
    res.json({ registrations: { received, sent } });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (req.body.ownWG) {
      const {
        rows: [registration],
      } = await Registrations.createOwn({
        beneficiary: req.body.account,
        wg: req.body.ownWG,
      });
      return res.status(201).json({ registration });
    }
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
      registration.working_group,
    );
    registration.wgPaths = wgPaths;
    registration.requireAction =
      registration.beneficiary !== res.locals.accountId &&
      !registration.denied_at &&
      !registration.accepted_at;
    res.json({ registration });
  } catch (err) {
    next(err);
  }
};
