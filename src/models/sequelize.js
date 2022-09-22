const { config } = require('dotenv')
const Sequelize = require('sequelize')
const configs = require('../../database/config/config')


const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});
module.exports = sequelize