const { Registrations, WGPaths, RegistrationsStreams } = require("models");

exports.forward = async (req, res, next) => {
  try {
    const {
      rows: [stream],
    } = await RegistrationsStreams.forward(req.params.id, req.body.wgPath);
    const {
      rows: [registration],
    } = await Registrations.find(req.params.id);
    registration.stream = stream;
    res.status(200).json({ registration });
  } catch (err) {
    next(err);
  }
};

exports.accept = async (req, res, next) => {
  try {
    const {
      row: [registration],
    } = await Registrations.accept(req.params.id);
    return res.status(201).json({ registration });
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
    const { rows: sent } = await Registrations.getOwn(req.params.organisation);
    res.json({ registrations: received.concat(sent) });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.body.beneficiary) {
      return res.status(422).json({ message: "missing beneficiary in body" });
    }
    if (!req.body.wg && !req.body.wgPath) {
      return res
        .status(422)
        .json({ message: "missing ownWG or wgPath in body" });
    }
    if (!req.body.wgPath) {
      const {
        rows: [registration],
      } = await Registrations.createOwn(req.body);
      return res.status(201).json({ registration });
    }
    const {
      rows: [registration],
    } = await Registrations.create(req.body);
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
    if (wgPaths.length) {
      registration.wgPaths = wgPaths;
    } else {
      registration.lastStep = true;
    }
    registration.forwarded =
      registration.last_forwarded === req.params.organisation;
    registration.requireAction =
      registration.beneficiary !== res.locals.accountId &&
      !registration.denied_at &&
      !registration.accepted_at &&
      !registration.forwarded;
    res.json({ registration });
  } catch (err) {
    next(err);
  }
};
