const {models} = require('../libs/sequelize')

class UserService{
    
    constructor(){

    }

    // creamos el metodo find que retorna todos los users en la base de datos
    async find(){
        const users = await models.User.findAll();
        return users;
    }

    async findOne(id){
        const user = await models.User.findOne({where: {id :id}});
        return user
    }

    async create(data){
        const user = await models.User.create(data);
        return user;
    }

    async update(id,data){
        const user = await models.User.update(data,{where:{id:id}});
        return user;
    }

    async delete(id){
        const user = await models.User.destroy({where:{id:id}});
        return user;
    }

}

module.exports = UserService;