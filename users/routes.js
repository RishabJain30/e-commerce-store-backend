const router = require('express').Router();
const UsersController = require('./controllers/UsersController');

const IsAuthenticatedMiddleware = require('../common/middlewares/IsAuthenticatedMiddleware');
const CheckPermissionMiddleware = require('../common/middlewares/CheckPermissionMiddleware');
const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware');

const { roles } = require("../config");

const updateUserPayload = require('./schemas/updateUserPayload');
const changeRolePayload = require('./schemas/changeRolePayload');

router.get("/", [IsAuthenticatedMiddleware.check], UsersController.getUser);

router.patch("/",
    [IsAuthenticatedMiddleware.check, SchemaValidationMiddleware.verify(updateUserPayload)],
    UsersController.updateUser
)

router.get("/all",
    [IsAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
    UsersController.getAllUsers
);

router.patch("/change-role/:userId",
    [IsAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(changeRolePayload)], UsersController.changeRole
);

router.delete("/:userId",
    [IsAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
    UsersController.deleteUser
);

module.exports = router;