const { Registrations, WGPaths, RegistrationsStreams } = require("models");

exports.accept = async (req, res, next) => {
  try {
    if (!req.body.wgPath) {
      return res.status(422).json({ message: "Missing wgPath in body" });
    }
    const { rows: managers } = await RegistrationsStreams.managers(
      req.params.id
    );
    const manager = managers.find(
      ({ account }) => account === res.locals.accountId
    );
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
    const { rows: managers } = await RegistrationsStreams.managers(
      req.params.id
    );
    const manager = managers.find(
      ({ account }) => account === res.locals.accountId
    );
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
    const { rows: registrations } =
      await Registrations.getFromManagedSubscriptions(res.locals.accountId);
    res.json({ registrations });
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
