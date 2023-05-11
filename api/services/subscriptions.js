const { Subscriptions } = require("../models");

const get = async (
  recipient,
  initialUser = null,
  subscription = null,
  downstream = new Set()
) => {
  console.log(downstream);
  if (downstream.has(subscription)) return;
  if (!subscription) initialUser = recipient;
  if (subscription) downstream.add(subscription);
  const { rows: subscribers } = await Subscriptions.getSubscribers(recipient);
  for (const { id, sender } of subscribers) {
    if (sender === initialUser) continue;
    await get(sender, initialUser, id, downstream);
  }
  return downstream;
};

exports.getDownstream = (userId) => get(userId);
