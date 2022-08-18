require('dotenv').config()

const jwt = require('jsonwebtoken')

const authorization = (role) => (req, res, next) => {
    try {
    // get token from header
    const {authorization} = req.headers
    const token = authorization.split(" ")[1] // ['Bearer', '<token>']

    // verify token using jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // cek apakah role yang akses sudah sesuai
    if (decoded.role !== role) {
        throw {
            code: 403, // forbidden
            message: 'role tidak di izinkan'
        }
    }

    // inject context
    req.user_id = decoded.user_id
    req.role = decoded.role

    next()
    } catch (error) {
        next({code: error.code || 401, message: error.message || 'invalid token'})
    }
}

module.exports = {
    authorization
}