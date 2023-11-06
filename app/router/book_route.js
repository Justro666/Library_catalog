const router = require("express").Router();
const controller = require("../access/controller/book_controller.js");
const { validateBody } = require("../access/middleware/validator.js");
const { Schema } = require("../access/validator/vschema.js");

router.post("/allBooks", validateBody(Schema.allBook), controller.allBooks);
router.post("/addBook", validateBody(Schema.addBook), controller.addBook);
router.post("/rentBook", validateBody(Schema.rentBook), controller.rentBook);
router.post(
  "/returnRentBook",
  validateBody(Schema.returnRentBook),
  controller.updateRentBook
);
router.get("/allRentBook", controller.allRentedBook);

module.exports = router;
