const router = require("express").Router();
const controller = require("../access/controller/user_controller");

router.get("/", controller.all);
router.post("/", controller.add);

router
  .route("/:id")
  .get(controller.get)
  .patch(controller.patch)
  .delete(controller.drop);

module.exports = router;
