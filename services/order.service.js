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
        return order;
    }

    async create(data){
        const order = await models.Order.create(data)
        return order;
    }

    async update(id,data){
        const order = await models.Order.update(data,{where: {id: id}})
        return order;
    }

    async delete(id){
        const order = await models.Order.destroy({where: {id: id}})
        return order;
    }
}

module.exports = OrderService;