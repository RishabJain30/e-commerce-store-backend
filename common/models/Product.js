const { DataTypes } = require("sequelize");
const { productPriceUnits } = require("../../config");

ProductModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: productPriceUnits.DOLLAR,
    },
};

module.exports = {
    model: null, // Will be set during initialization
    
    initialize: (sequelize) => {
        this.model = sequelize.define("product", ProductModel);
        return this.model;
    },

    associate: (models) => {
        this.model.hasMany(models.ProductVariant, {
            foreignKey: 'productId',
            as: 'variants'
        });
    },

    createProduct: (product) => {
        return this.model.create(product);
    },

    findProduct: (query) => {
        return this.model.findOne({ where: query });
    },

    findAllProducts: (query) => {
        return this.model.findAll({ where: query });
    },

    updateProduct: (query, updatedValue) => {
        return this.model.update(updatedValue, { where: query });
    },

    deleteProduct: (query) => {
        return this.model.destroy({ where: query });
    }
}