const express = require('express')
const app = express()

const payments = require('../routes/payments.routes')
const items = require('../routes/items.routes')
const orderitems = require('../routes/orderitems.routes')
const orders = require('../routes/orders.routes')
const auth = require('../routes/auth.routes')
const user = require('../routes/user.routes')
const promos = requizre('../routes/promos.routes');
const upload = require('../routes/uploadfile.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.group('/api/v1', (router) => {
    router.use('/payments', payments)
    router.use('/items', items)
    router.use('/orderitems', orderitems)
    router.use('/orders', orders)
    router.use('/auth', auth)
    router.use('/users', user)
    router.use('/promos', promos)
    router.use('/upload', upload)
})

module.exports = app
