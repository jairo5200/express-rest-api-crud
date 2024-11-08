// importamos Model DataTypes y Sequelize para poder utilizarlos
const {Model, DataTypes, Sequelize} = require('sequelize');


// Creamos un nombre para la tabla de productos
const PRODUCT_TABLE = 'products';
// Creamos un esquema para la tabla de productos
const productSchema = {
    id:{
        allownull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name:{
        allownull:false,
        type: DataTypes.STRING,
        },
    description:{
        allownull:false,
        type: DataTypes.STRING,
    },
    price:{
        allownull:false,
        type: DataTypes.DECIMAL(10,2),
    },
    amount:{
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

// Creamos la clase Product que hereda de Model
class Product extends Model{
    static config(sequelize){
        return{
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false,
        }
    }
    static associate(models){
        this.belongsToMany(models.Order, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'productId',
          });
    }
}



// importamos el nombre de la tabla, su esquema y la clase Product para que puedan ser utilizados en otros archivos
module.exports = {PRODUCT_TABLE,productSchema,Product};

