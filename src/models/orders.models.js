const Sequelize = require('sequelize')

const sequelize = require('./sequelize')

class order extends sequelize.Model {}

order.int({
        id: {
            type: sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        id_users: {
            type: sequelize.DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'

        },
        id_order_items: {
            type: sequelize.DataTypes.INTEGER,
            references: {
                model: 'order_items', // nama table
                key: 'id' // nama column
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_promo: {
            type: sequelize.DataTypes.INTEGER,
            references: {
                model: 'promos',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        no_invoice: {

            type: sequelize.DataTypes.STRING,

        },
        customer_name: {
            type: sequelize.DataTypes.STRING,
        },
        date_order: {
            type: sequelize.DataTypes.DATE,
            default: new DATE(),
        },
        sender_addres: {
            type: sequelize.DataTypes.TEXT,
        },
        receiver_addres: {
            type: sequelize.DataTypes.TEXT,
        },
        total_price: {
            type: sequelize.DataTypes.FLOAT,
        },
        order_status: {
            type: sequelize.DataTypes.INTEGER,
        },
    }, {
        sequelize: sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'orders'
    }

)
module.exports = orders