// importamos Model DataTypes y Sequelize para poder utilizarlos
const {Model, DataTypes, Sequelize} = require('sequelize');

// Creamos un nombre para la tabla de ordenes
const ORDER_TABLE = 'orders';
// Creamos un esquema para la tabla de ordenes
const orderSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allownull:false,
    },
    status:{
        type: DataTypes.STRING,
        allownull:false,
    },
    createAt:{
        type: DataTypes.DATE,
        allownull:false,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
          },
        },
}

class Order extends Model{
    static associate(models){
        this.belongsTo(models.User, {
            as: 'user'
        });
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId',
          });
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false,
        }
    }
}

module.exports = {Order,orderSchema,ORDER_TABLE};