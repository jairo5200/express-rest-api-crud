const boom =  require('@hapi/boom');
const {models} = require('../libs/sequelize');
const bcrypt = require('bcrypt');

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
        const newUser = await models.User.findOne({where:{email:data.email}});
        if (newUser) {
            throw new Error("User already exist");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await models.User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
            });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
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

    async login(data){
        const user = await models.User.findOne({where:{email:data.email}});
        if (!user) {
            throw boom.notFound('user not found');
        }
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            throw boom.badRequest('invalid password');
        }
        return{
            id: user.id,
            name: user.name,
            email: user.email,
        }       
    }
}

module.exports = UserService;