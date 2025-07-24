const router = require("express").Router();

const ProductsController = require("./controllers/ProductsController");

const IsAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

const createProductPayload = require("./schemas/createProductPayload");
const updateProductPayload = require("./schemas/updateProductPayload");
const createVariantPayload = require("./schemas/createVariantPayload");
const updateVariantPayload = require("./schemas/updateVariantPayload");
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

router.get(
    "/:productId/variants",
    [IsAuthenticatedMiddleware.check],
    ProductsController.getProductVariants
)

router.post(
  "/",
  [
    IsAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(createProductPayload),
  ],
  ProductsController.createProduct
);

router.post(
    "/:productId/variants",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
        SchemaValidationMiddleware.verify(createVariantPayload),
    ],
    ProductsController.createProductVariant
)

router.patch(
  "/:productId",
  [
    IsAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateProductPayload),
  ],
  ProductsController.updateProduct
);

router.patch(
  "/:productId/variants/:variantId",
  [
    IsAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateVariantPayload),
  ],
  ProductsController.updateProductVariant
);

router.delete(
  "/:productId",
  [IsAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  ProductsController.deleteProduct
);

router.delete(
  "/:productId/variants/:variantId",
  [IsAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  ProductsController.deleteProductVariant
);

module.exports = router;