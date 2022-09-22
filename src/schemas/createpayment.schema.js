const joi = require("joi")

const createPaymentSchema = joi.object({
    id_payments: joi.number().required(),
    id_orders: joi.number().required(),
    payment_date: joi.string().min(4).required(),
    payment_type:  joi.number().required(),
    amount:  joi.number().required(),
    payment_status: joi.string().valid('PAID', 'UNPAID'),

})

module.exports = createOrderItemsSchema