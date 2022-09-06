const joi = require('joi')

const orderSchema = joi.object({
    promo: joi.string(),
    sender_addres: joi.string().min(10).required(),
    receiver_address: joi.string().min(10).required(),
    items: joi.array().required(),
})

module.exports = orderSchema
