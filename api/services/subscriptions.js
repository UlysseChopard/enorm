const { Subscriptions } = require("models");

const get = async (
  initialOrganisation,
  organisation,
  subscription = null,
  downstream = new Set()
) => {
  if (downstream.has(subscription)) return;
  if (subscription) downstream.add(subscription);
  const { rows: subscribers } = await Subscriptions.getSubscribers(
    organisation
  );
  for (const { id, sender } of subscribers) {
    if (sender === initialOrganisation) continue;
    await get(initialOrganisation, sender, id, downstream);
  }
  return downstream;
};

exports.getDownstream = (organisation) => get(organisation, organisation);
