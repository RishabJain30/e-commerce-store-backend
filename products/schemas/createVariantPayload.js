const { productSize } = require("../../config");

module.exports = {
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
    required: ["size", "color"],
    additionalProperties: false,
};