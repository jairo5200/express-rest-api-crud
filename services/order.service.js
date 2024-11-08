const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { OrderProduct } = require('../db/models/order-product.model');

class OrderService{

    constructor(){

    }

    async find(){
        const orders = await models.Order.findAll({include: 'items'});
        return orders;
    }

    async findOne(id){
        const order = await models.Order.findByPk(id,
            {include: ['items']},
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
                await product.update({amount: product.amount-data.amount});
                const item = await models.OrderProduct.findOne({where: {productId:data.productId}});
                if (item) {
                    await item.update({amount: item.amount+data.amount})
                    return item;
                }else{
                    const newProduct = await models.OrderProduct.create(data);
                    return newProduct;  
                }
    }
}

module.exports = OrderService;