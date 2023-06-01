const { Subscriptions } = require("../models");

const get = async (
  initialUser,
  user,
  subscription = null,
  downstream = new Set()
) => {
  if (downstream.has(subscription)) return;
  if (subscription) downstream.add(subscription);
  const { rows: subscribers } = await Subscriptions.getSubscribers(user);
  for (const { id, sender } of subscribers) {
    if (sender === initialUser) continue;
    await get(initialUser, sender, id, downstream);
  }
  return downstream;
};

exports.getDownstream = (userId) => get(userId, userId);
