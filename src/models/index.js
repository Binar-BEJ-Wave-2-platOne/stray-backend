const sequelize = require('./sequelize')
const Roles = require('./roles')
const Verifikasi = require('./verifikasi')

// relasi login
Roles.hasMany(Users, {
  as: 'users',
  foreignKey: 'role_id',
})

Users.belongsTo(Roles, { 
  as: 'role',
  foreignKey: 'role_id',
})

// relasi user dengan verifikasi
Users.hasMany(Verifikasi, {
    as: 'verifikasi',
    foreignKey: 'user_id',
})

Verifikasi.belongsTo(Users, {
    as: 'users',
    foreignKey: 'user_id',
})


module.exports = {
    sequelize,
    Roles,
    Verifikasi
}