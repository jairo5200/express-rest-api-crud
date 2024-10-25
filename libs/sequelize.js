const {Sequelize} = require('sequelize');
const {config} = require('../config/config');
require('dotenv').config();
//const setupModels = require('../db/models');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: '127.18.0.3',
    dialect: 'postgres',
  });

//setupModels(sequelize);

module.exports = sequelize;