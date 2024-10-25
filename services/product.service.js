const {models} = require('../libs/sequelize')


class ProductsService{

    constructor(){

    }

    find(){
        const rta = models.Product.findAll();
        return rta;
    }
}

module.exports = ProductsService;