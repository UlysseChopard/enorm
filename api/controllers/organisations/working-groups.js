const { WorkingGroups, WGPaths } = require("models");
const { getDownstream } = require("services/subscriptions");

exports.get = async (req, res, next) => {
  try {
    const { rows: rawGroups } = await WorkingGroups.getByOrganisation(
      req.params.organisation,
    );
    const groups = Object.values(
      rawGroups.reduce((acc, val) => {
        if (!acc[val.id]) {
          acc[val.id] = val;
          acc[val.id].wg_paths = [];
        }
        if (val.wg_path) {
          acc[val.id].wg_paths.push({
            id: val.wg_path,
            organisation: val.wg_path_organisation,
          });
        }
        delete acc[val.id].wg_path;
        delete acc[val.id].wg_path_organisation;
        return acc;
      }, {}),
    );
    res.json({ groups });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      rows: [group],
    } = await WorkingGroups.create(req.params.organisation, req.body);
    const impactedSubscriptions = await getDownstream(req.params.organisation);
    for (const subscription of impactedSubscriptions) {
      await WGPaths.add(subscription, group.id);
    }
    res.status(201).json({ group });
  } catch (err) {
    next(err);
  }
};

exports.find = async (req, res, next) => {
  try {
    const {
      rows: [wg],
    } = await WorkingGroups.find(req.params.wg);
    const { rows: wgPaths } = await WGPaths.find(
      req.params.organisation,
      req.params.wg,
    );
    res.json({ wg: { ...wg, wgPaths } });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [wg],
    } = await WorkingGroups.remove(req.params.wg);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      rows: [wg],
    } = await WorkingGroups.update(req.params.wg, req.body);
    if (!wg) {
      return res.status(500).json({ message: "could not update wg" });
    }
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};
