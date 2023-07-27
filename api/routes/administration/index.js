const users = require("./users");
const establishments = require("./establishments");
const organisations = require("./organisations");

module.exports = (router) => {
  const adminRouter = router();
  adminRouter.use("/users", users(router()));
  adminRouter.use("/establishments", establishments(router()));
  adminRouter.use("/organisations", organisations(router()));
  return adminRouter;
};
