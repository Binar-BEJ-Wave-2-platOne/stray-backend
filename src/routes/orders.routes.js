const { CreateOrder } = require('../controllers/orders.controllers')

const router = require('express').Router()

router.post('/createorder', CreateOrder)

module.exports = router