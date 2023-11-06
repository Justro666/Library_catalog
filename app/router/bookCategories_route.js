const router = require("express").Router();
const controller = require("../access/controller/book_categories_controller.js");
const { validateBody } = require("../access/middleware/validator.js");
const { Schema } = require("../access/validator/vschema.js");

router.get("/allCategories", controller.getCategory);
router.post("/singleCategories", controller.singleCategory);
router.post("/addCategories", [
  validateBody(Schema.addCategory),
  controller.addCategory
]);
router.post("/updateCategories", [
  validateBody(Schema.updateCategory),
  controller.updateCategory
]);
router.post("/deleteCategories", [
  validateBody(Schema.idParams),
  controller.deleteCategory
]);

module.exports = router;
