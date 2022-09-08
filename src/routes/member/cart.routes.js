const { createCart } = require('../../controllers/cart.controller')
const cartSchemas = require('../../schemas/cart.schema')
const validation = require('../../middlewares/validation.middleware')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')
const router = require('express').Router()

router.post('/', isTokenValid('MEMBER'), validation(cartSchemas), createCart)

module.exports = router
