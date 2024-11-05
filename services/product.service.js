const boom = require('@hapi/boom');
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
        if (!product) {
            throw boom.notFound('product not found');
        }
        return product;
    }

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async update(id,data){
        const product = await models.Product.findOne({where: {id: id}});
        if (!product) {
            throw boom.notFound('product not found')
        }
        const rta = product.update(data);
        return rta;
    }

    async delete(id){
        const product = await models.Product.findOne({where: {id: id}});
        if (!product) {
            throw boom.notFound('product not found')
        }
        await product.destroy(product);
        const rta = {
            message: 'product deleted',
            id: id
        }
        return rta;
    }
}

// exportamos la clase ProductsService
module.exports = ProductsService;