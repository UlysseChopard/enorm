const { Subscriptions } = require("models");

const get = async (
  initialAccount,
  account,
  subscription = null,
  downstream = new Set()
) => {
  if (downstream.has(subscription)) return;
  if (subscription) downstream.add(subscription);
  const { rows: subscribers } = await Subscriptions.getSubscribers(account);
  for (const { id, sender } of subscribers) {
    if (sender === initialAccount) continue;
    await get(initialAccount, sender, id, downstream);
  }
  return downstream;
};

exports.getDownstream = (accountId) => get(accountId, accountId);
