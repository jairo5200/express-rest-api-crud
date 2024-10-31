const {Model, DataTypes, Sequelize} = require('sequelize');

// creamos el nombre de la tabla de ordenes-productos
const ORDER_PRODUCT_TABLE = 'orders_products';
// Creamos un esquema para la tabla de ordenes-productos
const orderProductSchema = {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    orderId: {
        allowNull: false,
        field: 'order_id',
        type: DataTypes.INTEGER,
        references: {
            model: 'orders',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    productId: {
    allowNull: false,
    field: 'product_id',
    type: DataTypes.INTEGER,
    references: {
        model: 'products',
        key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    }
};


class OrderProduct extends Model{
    static associate(models){
  
    }
    static config(sequelize){
      return{
        sequelize,
        tableName: ORDER_PRODUCT_TABLE,
        modelName: 'OrderProduct',
        timestamps: false,
      }
    }
}

module.exports = {OrderProduct, ORDER_PRODUCT_TABLE,OrderProductSchema};