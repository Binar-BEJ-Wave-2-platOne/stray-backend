const { Model, DataTypes } = require("sequelize")
const connection = require("./sequelize")

class Verifikasi extends Model {}

Verifikasi.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    user_id: {   
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    kode_verifikasi: {
        type: DataTypes.STRING
    },
    expired_date: {
        type: DataTypes.DATE,
        default: new DATE(),
    },
    status: {
        type: DataTypes.ENUM,
        values: ['ADMIN', 'MEMBER']
    },
}, {
    sequelize: connection, 
    timestamps: true, 
    underscored: true, 
    paranoid: true, 
    freezeTableName: true,
    tableName: 'verifikasi'
})

module.exports = Verifikasi