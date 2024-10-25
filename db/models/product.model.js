const {Model, DataTypes, Sequelize} = require('sequelize');

const PRODUCT_TABLE = 'products';
const ProductSchema = {
    id:{
        allownull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    nombre:{
        allownull:false,
        type: DataTypes.STRING,
        },
    descripcion:{
        allownull:false,
        type: DataTypes.STRING,
    },
    precio:{
        allownull:false,
        type: DataTypes.DECIMAL(10,2),
    },
    cantidad:{
        allownull:false,
        type: DataTypes.INTEGER,
    },
    createdAt:{
        allownull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    }
}

class Product extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false,
        }
    }
}



module.exports = {PRODUCT_TABLE,ProductSchema,Product};

