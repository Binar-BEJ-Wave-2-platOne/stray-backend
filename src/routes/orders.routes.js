const { CreateOrder } = require('../controllers/orders.controllers')
const validation = require('../middlewares/validation.middleware')
const orderSchema = require('../schemas/createorder.schema')
const { isTokenValid } = require('../middlewares/verifyToken.middleware')
const router = require('express').Router()

router.post('/', isTokenValid('MEMBER'), validation(orderSchema), CreateOrder)

module.exports = router
