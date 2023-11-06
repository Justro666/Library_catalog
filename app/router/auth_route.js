const router = require("express").Router();
const authController = require("../access/controller/auth_controller");
const loginLimiter = require("../access/middleware/loginLimiter");
const { validateBody } = require("../access/middleware/validator");
const { Schema } = require("../access/validator/vschema");

router.post("/register", [
  loginLimiter,
  validateBody(Schema.addUser),
  authController.register
]);
router.post("/login", [
  loginLimiter,
  validateBody(Schema.userLogin),
  authController.login
]);
router.get("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post("/adLogin", [
  loginLimiter,
  validateBody(Schema.userLogin),
  authController.adLogin
]);

module.exports = router;
