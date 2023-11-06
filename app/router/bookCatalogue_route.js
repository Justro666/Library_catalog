const router = require("express").Router();
const controller = require("../access/controller/book_cat_controller.js");
const { validateBody } = require("../access/middleware/validator.js");
const { Schema } = require("../access/validator/vschema.js");

router.get("/allCatalogue", controller.getCatalogue);
router.post("/singleCatalogue", controller.singleCatalogue);
router.post("/addCatalogue", [
  validateBody(Schema.addCatalogue),
  controller.addCatalogue
]);
router.post("/updateCatalogue", [
  validateBody(Schema.updateCatalogue),
  controller.updateCatalogue
]);
router.post("/deleteCatalogue", [
  validateBody(Schema.idParams),
  controller.deleteCatalogue
]);

module.exports = router;
