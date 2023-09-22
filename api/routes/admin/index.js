const superusers = require("./superusers");
const organisations = require("./organisations");

module.exports = ({ Router }) => {
  const router = Router();
  router.use("/superusers", superusers({ Router }));
  router.use("/organisations", organisations({ Router }));
  return router;
};
