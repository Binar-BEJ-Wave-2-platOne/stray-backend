const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Promos extends Sequelize.Model {}

Promos.init ({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    promo_name: {
        type: Sequelize.DataTypes.STRING
    },
    promo_category: {
        type: Sequelize.DataTypes.STRING
    },
    promo_code: {
        type: Sequelize.DataTypes.STRING
    },
    promo_amount: {
        type: Sequelize.DataTypes.INTEGER
    }
},
    {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'promos'
})

module.exports = Promos