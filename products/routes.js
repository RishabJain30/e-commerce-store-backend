const router = require("express").Router();

const ProductsController = require("./controllers/ProductsController");

const IsAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

const createProductPayload = require("./schemas/createProductPayload");
const updateProductPayload = require("./schemas/updateProductPayload");
const { roles } = require("../config");

router.get(
    "/",
    [IsAuthenticatedMiddleware.check],
    ProductsController.getAllProducts
);

router.get(
  "/:productId",
  [IsAuthenticatedMiddleware.check],
  ProductsController.getProductById
);

router.post(
  "/",
  [
    IsAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(createProductPayload),
  ],
  ProductsController.createProduct
);

router.patch(
  "/:productId",
  [
    IsAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateProductPayload),
  ],
  ProductsController.updateProduct
);

router.delete(
  "/:productId",
  [IsAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  ProductsController.deleteProduct
);

module.exports = router;