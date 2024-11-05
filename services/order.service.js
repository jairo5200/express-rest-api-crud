const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')

class OrderService{

    constructor(){

    }

    async find(){
        const orders = await models.Order.findAll();
        return orders;
    }

    async findOne(id){
        const order = await models.Order.findOne({where: {id: id}});
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
}

module.exports = OrderService;