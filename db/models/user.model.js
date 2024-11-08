// importamos Model DataTypes y Sequelize para poder utilizarlos
const {Model, DataTypes, Sequelize} = require('sequelize');

// Creamos un nombre para la tabla de usuarios
const USER_TABLE = 'users';
// Creamos un esquema para la tabla de usuarios
const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Creamos un campo para la fecha de creación
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    }
}

class User extends Model{
    static associate(models){
        this.hasMany(models.Order, {
          as: 'orders',
        foreignKey: 'userId'
        })
      }
    static config(sequelize){
        return{
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
        }
    }
}


// importamos el nombre de la tabla, su esquema y la clase User para que puedan ser utilizados en otros archivos
module.exports = {USER_TABLE,userSchema,User};