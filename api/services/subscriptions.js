const { Subscriptions } = require("../models");

exports.getDownstream = async (
  recipient,
  subscription = null,
  downstream = new Set()
) => {
  if (downstream.has(subscription)) return;
  if (subscription) downstream.add(subscription);
  const { rows: subscribers } = await Subscriptions.getSubscribers(recipient);
  for (const { id, sender } of subscribers) {
    await exports.getDownstream(sender, id, downstream);
  }
  return downstream;
};
