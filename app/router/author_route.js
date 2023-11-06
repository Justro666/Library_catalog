const router = require("express").Router();
const controller = require("../access/controller/author_controller.js");
const { validateBody } = require("../access/middleware/validator.js");
const { Schema } = require("../access/validator/vschema.js");

router.post("/allAuthors", [
  validateBody(Schema.singleAuthor),
  controller.getAuthor
]);
router.post("/singleAuthors", [
  validateBody(Schema.idParams),
  controller.singleAuthor
]);
router.post("/addAuthors", [
  validateBody(Schema.addAuthor),
  controller.addAuthor
]);
router.post("/updateAuthor", [
  validateBody(Schema.updateAuthor),
  controller.updateAuthor
]);
router.post("/deleteAuthor", [
  validateBody(Schema.idParams),
  controller.deleteAuthor
]);

module.exports = router;
