const { Model, DataTypes } = require("sequelize")
const connection = require("./sequelize")

class Order_status extends Model {}

Order_status.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    status_order: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: connection, 
    timestamps: true, 
    underscored: true, 
    paranoid: true, 
    freezeTableName: true,
    tableName: 'order_status'
})

module.exports = Order_status