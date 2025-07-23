const UserRoutes = require('./users/routes');
const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const port = require('./config');
const PORT = process.env.PORT || port;

app.use(express.json());

app.use('/user', UserRoutes);