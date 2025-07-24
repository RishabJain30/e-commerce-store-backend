const { productSize } = require("../../config");
const createVariantPayload = {
    type: "object",
    properties: {
        size: {
            type: "string",
            enum: Object.values(productSize),
        },
        color: {
            type: "string",
            minLength: 1,
        },
    },
    required: ["productId", "size", "color"],
    additionalProperties: false,
}