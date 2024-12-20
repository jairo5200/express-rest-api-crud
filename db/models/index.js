// importamos el modulo del modelo de productos para incializarlo
const {Product, productSchema} = require('./product.model')
// importamos el modulo del modelo de usuarios para incializarlo
const {User, userSchema} = require('./user.model')
// importamos el modulo del modelo de orders para incializarlo
const {Order, orderSchema} = require('./order.model')
// importamos el modulo del modelo de orders-products para incializarlo
const {OrderProduct, orderProductSchema} = require('./order-product.model')

// funcion que nos permite inicializar todos los modelos y relaciones
function setupModels(sequelize){
    Product.init(productSchema, Product.config(sequelize));
    User.init(userSchema, User.config(sequelize));
    Order.init(orderSchema, Order.config(sequelize));
    OrderProduct.init(orderProductSchema, OrderProduct.config(sequelize));

    // establecemos las relaciones entre los modelos
    User.associate(sequelize.models);
    Order.associate(sequelize.models);
}


// Exportamos la funcion setupModels para que pueda ser utilizada en otros archivos
module.exports = {setupModels};