const {models} = require('../libs/sequelize')



// creamos la clase ProductsService
class ProductsService{

    constructor(){

    }

    // creamos el metodo getProducts que retorna todos los products en la base de datos
    find(){
        const rta = models.Product.findAll();
        return rta;
    }
}

// exportamos la clase ProductsService
module.exports = ProductsService;