const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const port = require('./config');
const PORT = process.env.PORT || port;

const AuthorisationRoutes = require('./authorisation/routes');
const UserRoutes = require('./users/routes');
const ProductRoutes = require('./products/routes');

const UserModel = require('./common/models/User');
const ProductModel = require('./common/models/Product');
const ProductVariantModel = require('./common/models/ProductVariant');

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const sequelize = new Sequelize('ecommerce_db', 'root', '@Rishab2003', {
  host: 'localhost',
  dialect: "mysql",
});

UserModel.initialize(sequelize);
const productModel = ProductModel.initialize(sequelize);
const productVariantModel = ProductVariantModel.initialize(sequelize);

// Set up associations after all models are initialized
const models = {
    Product: productModel,
    ProductVariant: productVariantModel,
    User: UserModel.model
};

// Call associate methods if they exist
if (ProductModel.associate) {
    ProductModel.associate(models);
}
if (ProductVariantModel.associate) {
    ProductVariantModel.associate(models);
}

sequelize
    .authenticate()
    .then(() => {
        console.log('✅ Connected to MySQL 8.0 successfully.');

        return sequelize.sync(); // proceed to sync tables
    })
    .then(() => {
        console.log("sequelize initialized!!");

        app.use('/', AuthorisationRoutes);
        app.use('/user', UserRoutes);
        app.use('/product', ProductRoutes);

        app.listen(PORT, () => {
            console.log("Server listening on port:", PORT);
        });
    })
    .catch((err) => {
        console.error("Error initializing sequelize:", err);
    });