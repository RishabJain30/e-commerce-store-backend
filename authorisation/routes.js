const router = require('express').Router();

const AuthorisationController = require('../authorisation/controllers/AuthorisationController');

const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware');

// JSON Schema Imports for payload verification
const registerPayload = require("./schemas/registerPayload");
const loginPayload = require("./schemas/loginPayload");

router.post(
    "signup", [SchemaValidationMiddleware.verify(registerPayload)],
    AuthorisationController.register
);

router.post(
  "/login",
  [SchemaValidationMiddleware.verify(loginPayload)],
  AuthorizationController.login
);

module.exports = router;