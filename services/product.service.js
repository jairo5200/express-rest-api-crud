const {models} = require('../libs/sequelize')



// creamos la clase ProductsService
class ProductsService{

    constructor(){

    }

    // creamos el metodo find que retorna todos los products en la base de datos
     async find(){
        const rta = models.Product.findAll();
        return rta;
    }
    // creamos el metodo findOne que nos retrna el producto con el id
    async findOne(id){
        const rta = models.Product.findOne({where: {id: id}});
        return rta;
    }
}

// exportamos la clase ProductsService
module.exports = ProductsService;