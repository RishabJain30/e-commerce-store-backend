const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const port = require('./config');
const PORT = process.env.PORT || port;

const AuthorisationRoutes = require('./authorisation/routes');
const UserRoutes = require('./users/routes');

const UserModel = require('./common/models/User');

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
});

UserModel.initialize(sequelize);

sequelize
    .sync()
    .then(() => {
        console.log("sequelize initialized!!");

        app.use('/', AuthorisationRoutes);
        app.use('/user', UserRoutes);

        app.listen(PORT, () => {
            console.log("Server listening on port:", PORT);
        });
    })
    .catch((err) => {
        console.error("Error initializing sequelize:", err);
    });