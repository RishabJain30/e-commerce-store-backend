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

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const sequelize = new Sequelize('ecommerce_db', 'root', '@Rishab2003', {
  host: 'localhost',
  dialect: "mysql",
});

UserModel.initialize(sequelize);
ProductModel.initialize(sequelize);

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