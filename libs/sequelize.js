// importaos todo el modulo de Sequelize
const {Sequelize} = require('sequelize');
// importamos la configuracion de varibles
const {config} = require('../config/config');
require('dotenv').config();
// importamos la inicialisacion de las tablas de la base de datos
const {setupModels} = require('../db/models');

//
// guardamos la conexion a la base de datos en la variable sequelize
const sequelize = new Sequelize(config.dbUrl, {
    dialect: 'postgres',
  });

  // creamos la base de datos
setupModels(sequelize);

// exportamos la variable sequelize para poder utilizarla en otros archivos
module.exports = sequelize;