// importamos el modulo del modelo de productos para incializarlo
const {Product, ProductSchema} = require('./product.model')

// funcion que nos permite inicializar todos los modelos y relaciones
function setupModels(sequelize){
    Product.init(ProductSchema, Product.config(sequelize));
}


// Exportamos la funcion setupModels para que pueda ser utilizada en otros archivos
module.exports = {setupModels};