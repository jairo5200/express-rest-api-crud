// importamos el modulo del modelo de productos para incializarlo
const {Product, productSchema} = require('./product.model')
// importamos el modulo del modelo de usuarios para incializarlo
const {User, userSchema} = require('./user.model')

// funcion que nos permite inicializar todos los modelos y relaciones
function setupModels(sequelize){
    Product.init(productSchema, Product.config(sequelize));
    User.init(userSchema, User.config(sequelize));
}


// Exportamos la funcion setupModels para que pueda ser utilizada en otros archivos
module.exports = {setupModels};