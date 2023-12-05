const multer = require("multer");
const upload = multer({ dest: "uploads/members/" });
const {
  add,
  get,
  unlink,
  addOne,
} = require("controllers/organisations/members");
const { hasRole } = require("middlewares/roles");

const roles = require("./roles");

module.exports = ({ Router }) => {
  const router = Router({ mergeParams: true });
  router.get("/", hasRole("admin", "manager"), get);
  router.post("/", hasRole("admin"), addOne);
  router.patch("/", hasRole("admin"), upload.single("file"), add);
  router.delete("/:member", hasRole("admin"), unlink);
  router.use(roles({ Router }));
  return router;
};
