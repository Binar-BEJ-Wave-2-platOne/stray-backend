const { CreateOrder } = require('../controllers/orders.controllers')
const validation = require('../middlewares/validation.middleware')
const orderSchema = require('../schemas/createorder.schema')
const router = require('express').Router()

router.post('/createorder', validation(orderSchema), CreateOrder)

module.exports = router
