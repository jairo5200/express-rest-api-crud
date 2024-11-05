const boom =  require('@hapi/boom');
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
        if (!user) {
            throw boom.notFound('user not found');
        }
        return user
    }

    async create(data){
        const user = await models.User.create(data);
        return user;
    }

    async update(id,data){
        const user = await models.User.findOne({where:{id:id}});
        if (!user) {
            throw boom.notFound('user not found');
        }
        const rta = await user.update(data);
        return rta;
    }

    async delete(id){
        const user = await models.User.findOne({where:{id:id}})
        if (!user) {
            throw boom.notFound('user not found');
        }
        await models.User.destroy();
        const rta = {
            message: 'user deleted',
            id: id
        }
        return rta;
    }

}

module.exports = UserService;