const ProductModel = require("../../common/models/Product");
const ProductVariantModel = require("../../common/models/ProductVariant");

module.exports = {
    getAllProducts: (req, res) => {
        const {
            query: filters
        } = req;

        ProductModel.findAllProducts(filters)
            .then((products) => {
                return res.status(200).json({
                    status: true,
                    data: products,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getProductById: (req, res) => {
        const {
            params: { productId }
        } = req;

        ProductModel.findProduct({ id: productId })
            .then((product) => {
                return res.status(200).json({
                    status: true,
                    data: product.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    createProduct: (req, res) => {
        const { body } = req;

        ProductModel.createProduct(body)
            .then((product) => {
                return res.status(200).json({
                    status: true,
                    data: product.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    updateProduct: (req, res) => {
        const {
            params: { productId },
            body: payload
        } = req;

        if(!Object.keys(payload).length){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Body is empty, hence can not update the product.",
                },
            });
        }

        ProductModel.updateProduct({id: productId}, payload)
            .then(() => {
                return ProductModel.findProduct({id: productId});
            })
            .then((product) => {
                return res.status(200).json({
                    status: true,
                    data: product.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    deleteProduct: (req, res) => {
        const {
        params: { productId },
        } = req;

        ProductModel.deleteProduct({id: productId})
        .then((numberOfEntriesDeleted) => {
            return res.status(200).json({
            status: true,
            data: {
                numberOfProductsDeleted: numberOfEntriesDeleted
            },
            });
        })
        .catch((err) => {
            return res.status(500).json({
            status: false,
            error: err,
            });
        });
    },

    getProductVariants: (req, res) => {
        const {
            params: { productId }
        } = req;

        ProductVariantModel.findAllVariants({ productId })
            .then((variants) => {
                return res.status(200).json({
                    status: true,
                    data: variants,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    createProductVariant: (req, res) => {
        const {
            body,
            params: { productId }
        } = req;

        ProductModel.findProduct({ id: productId })
            .then((product) => {
                if (!product) {
                    res.status(404).json({
                    status: false,
                    error: { message: "Product not found." },
                    });
                    return;
                }
                return ProductVariantModel.createVariant({ ...body, productId });
            })
            .then((variant) => {
                return res.status(200).json({
                    status: true,
                    data: variant.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    updateProductVariant: (req, res) => {
        const {
            params: { productId, variantId },
            body: payload
        } = req;

        if(!Object.keys(payload).length){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Body is empty, hence can not update the product variant.",
                },
            });
        }

        ProductVariantModel.updateVariant({ id: variantId, productId }, payload)
            .then(() => {
                return ProductVariantModel.findVariant({ id: variantId, productId });
            })
            .then((variant) => {
                if (!variant) {
                    return res.status(404).json({
                    status: false,
                    error: { message: "Variant not found." }
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: variant.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    deleteProductVariant: (req, res) => {
        const {
            params: { productId, variantId }
        } = req;

        ProductVariantModel.deleteVariant({ id: variantId, productId })
            .then((numberOfEntriesDeleted) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfVariantsDeleted: numberOfEntriesDeleted
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    }
}