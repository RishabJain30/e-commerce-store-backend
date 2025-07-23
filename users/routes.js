const router = require('express').Router();
const UsersController = require('./controllers/UsersController');

const IsAuthenticatedMiddleware = require('../common/middlewares/IsAuthenticatedMiddleware');
const CheckPermissionMiddleware = require('../common/middlewares/CheckPermissionMiddleware');
const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware');

const { roles } = require("../config");

router.get("/", [IsAuthenticatedMiddleware], UsersController.getUser);

router.get("/all",
    [IsAuthenticatedMiddleware, CheckPermissionMiddleware.has(roles.ADMIN)],
    UsersController.getAllUsers
);

router.delete("/:userId",
    [IsAuthenticatedMiddleware, CheckPermissionMiddleware.has(roles.ADMIN)],
    UsersController.deleteUser
);

module.exports = router;