const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

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
        const itemsOrder = await models.OrderProduct.findAll({where: {orderId:id}})
        if (itemsOrder.length >0) {
            itemsOrder.forEach(async (item) => {
                const product = await models.Product.findOne({where: {id:item.productId}});
                product.amount += item.amount;
                item.destroy();
            });
        }
        await order.destroy();
        const rta = {
            message: 'order deleted',
            id: id
        }
        return rta;
    }

    async addProduct(id,data){
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

    async removeProduct(id,itemId){
        const order = await models.Order.findOne({where: {id:id}})
        if (!order) {
            throw boom.notFound('order not found');
            }
            const removeItem = await models.OrderProduct.findOne({where: {id:itemId}});
            if (!removeItem) {
                throw boom.notFound('item not found');
                }
                const product = await models.Product.findOne({where: {id:removeItem.productId}})
                if (!product) {
                    throw boom.notFound('product not found');
                }
                await product.update({amount: product.amount+removeItem.amount});
                removeItem.destroy();
                return {
                    message: 'item in order deleted',
                    id: id
                };     
    }
}

module.exports = OrderService;