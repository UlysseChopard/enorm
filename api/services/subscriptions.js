const { Subscriptions, } = require("../models");

exports.getDownstream = async (
  recipient,
  subscription = null,
  impacted = new Set()
) => {
  if (impacted.has(subscription)) return;
  impacted.add(subscription);
  const { rows: subscribers } = await Subscriptions.getSubscribers(recipient);
  for (const { id, sender } of subscribers) {
    await exports.getDownstream(sender, id, impacted);
  }
  return impacted;
};

