const {models} = require('../libs/sequelize')



// creamos la clase ProductsService
class ProductsService{

    constructor(){

    }

    // creamos el metodo find que retorna todos los products en la base de datos
     async find(){
        const products = await models.Product.findAll();
        return products;
    }
    // creamos el metodo findOne que nos retorna el product con el id
    async findOne(id){
        const product = await models.Product.findOne({where: {id: id}});
        return product;
    }

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async update(id,data){
        const product = await models.Product.findOne({where: {id: id}});
        const rta = product.update(data);
        return rta;
    }

    async delete(id){
        const rta = await models.Product.destroy({where: {id: id}});
        return rta;
    }
}

// exportamos la clase ProductsService
module.exports = ProductsService;