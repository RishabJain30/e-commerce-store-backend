const { DataTypes } = require("sequelize");
const { productSize } = require("../../config");

ProductVariantModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: productSize.MEDIUM,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    }
};

module.exports = {
    initialize: (sequelize) => {
        this.model = sequelize.define("product_variant", ProductVariantModel);
    },
    createVariant: (variant) => {
        return this.model.create(variant);
    },
    findVariant: (query) => {
        return this.model.findOne({ where: query });
    },
    findAllVariants: (query) => {
        return this.model.findAll({ where: query });
    },
    updateVariant: (query, updatedValue) => {
        return this.model.update(updatedValue, { where: query });
    },
    deleteVariant: (query) => {
        return this.model.destroy({ where: query });
    }
}

