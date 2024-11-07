const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { Product } = require('../db/models/product.model');

class OrderService{

    constructor(){

    }

    async find(){
        const orders = await models.Order.findAll();
        return orders;
    }

    async findOne(id){
        const order = await models.Order.findOne({
            where: {id: id}},
            {include: [{
                model: Product,
                as: 'product',
                attributes: ['price','amount'],
            }]},
        );
        if (!order) {
            throw boom.notFound('order not found');
        }
        return order;
    }

    async create(data){
        const order = await models.Order.create(data)
        return order;
    }

    async update(id,data){
        const order = await models.Order.findOne({where: {id:id}})
        if (!order) {
            throw boom.notFound('order not found');
        }
        const rta = await order.update(data)
        return rta;
    }

    async delete(id){
        const order = await models.Order.findOne({where: {id:id}})
        if (!order) {
            throw boom.notFound('order not found');
        }
        await order.destroy();
        const rta = {
            message: 'order deleted',
            id: id
        }
        return rta;
    }

    async addProduct(id,data){
        console.log(data);
        const order = await models.Order.findOne({where: {id:id}})
        if (!order) {
            throw boom.notFound('order not found');
            }
            const product = await models.Product.findOne({where: {id:data.productId}})
            if (!product) {
                throw boom.notFound('product not found');
                }
                const newProduct = await models.OrderProduct.create(data);
                return newProduct;
    }
}

module.exports = OrderService;