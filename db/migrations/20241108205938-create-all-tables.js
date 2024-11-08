'use strict';
const {PRODUCT_TABLE,productSchema} = require('../models/product.model');
const {USER_TABLE,userSchema} = require('../models/user.model');
const {ORDER_TABLE,orderSchema} = require('../models/order.model');
const {ORDER_PRODUCT_TABLE,orderProductSchema} = require('../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_TABLE,productSchema);
    await queryInterface.createTable(USER_TABLE,userSchema);
    await queryInterface.createTable(ORDER_TABLE,orderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE,orderProductSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(USER_TABLE); 
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};