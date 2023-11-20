const {
  Subscriptions,
  Organisations,
  WGPaths,
  WorkingGroups,
  Registrations,
} = require("models");
const { getDownstream } = require("services/subscriptions");

exports.get = async (req, res, next) => {
  try {
    await Subscriptions.updateReceived(req.params.organisation);
    const { rows: existing } = await Subscriptions.getByOrganisation(
      req.params.organisation
    );
    if (req.query.q) {
      const alreadySent = new Set(
        existing.filter((s) => s.recipient !== req.params.organisation)
      );
      alreadySent.add(parseInt(req.params.organisation));
      const subscriptions = await Organisations.searchName(req.query.q).then(
        ({ rows }) => rows.filter(({ id }) => !alreadySent.has(id))
      );
      return res.json({ subscriptions });
    }
    const providers = [];
    const subscribers = [];
    const sent = [];
    const received = [];
    for (const subscription of existing) {
      if (subscription.recipient == req.params.organisation) {
        if (subscription.accepted_at) {
          subscribers.push(subscription);
        } else {
          received.push(subscription);
        }
      } else {
        if (subscription.accepted_at) {
          providers.push(subscription);
        } else {
          sent.push(subscription);
        }
      }
    }
    return res.json({ providers, subscribers, sent, received });
  } catch (err) {
    next(err);
  }
};

exports.invite = async (req, res, next) => {
  try {
    if (!req.body.recipient)
      return res.status(400).json({ message: "Missing recipient id in body" });
    const {
      rows: [subscription],
    } = await Subscriptions.send(req.params.organisation, req.body.recipient);
    if (!subscription)
      return res.status(500).json({ message: "Could not send invitation" });
    res.status(201).json({ status: "sent" });
  } catch (err) {
    next(err);
  }
};

exports.establish = async (req, res, next) => {
  try {
    const {
      rows: [subscription],
    } = await Subscriptions.accept(req.params.subscription);
    if (!subscription) {
      return res
        .status(400)
        .json({ message: "No subscription to be established" });
    }
    const { rows: newWGs } = await WorkingGroups.getIdsByOrganisation(
      subscription.recipient
    );
    const impactedSubscriptions = await getDownstream(subscription.sender);
    impactedSubscriptions.add(subscription.id);
    for (const subscription of impactedSubscriptions) {
      for (const wg of newWGs) {
        await WGPaths.add(subscription, wg.id);
      }
    }
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    await Registrations.removeBySubscription(req.params.subscription);
    const {
      rows: [subscription],
    } = await Subscriptions.remove(req.params.subscription);
    const { rows: oldWGs } = await WorkingGroups.getIdsByOrganisation(
      subscription.recipient
    );
    const impactedSubscriptions = await getDownstream(subscription.sender);
    for (const subscription of impactedSubscriptions) {
      for (const wg of oldWGs) {
        await WGPaths.remove(subscription, wg.id);
      }
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
