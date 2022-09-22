require('dotenv').config()
module.exports = {
    username: process.env.postgres,
    password: process.env.postgres,
    database: process.env.postgres,
    host: process.env.localhost,
    dialect: process.env.postgres,
}
