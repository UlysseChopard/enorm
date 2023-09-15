const multer = require("multer");
const upload = multer({ dest: "uploads/members/" });
const {
  add,
  allow,
  disallow,
  get,
  unlink,
} = require("controllers/organisations/members");
const { hasRole } = require("middlewares/roles");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", hasRole("admin"), get);
  router.patch("/", hasRole("admin"), upload.single("file"), add);
  router.delete("/:member", hasRole("admin"), unlink);
  router.delete("/:member/roles/:role", hasRole("admin"), disallow);
  router.put("/:member/roles/:role", hasRole("admin"), allow);
  return router;
};
