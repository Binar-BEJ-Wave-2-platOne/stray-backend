const joi = require('joi')

const orderSchema = joi.object({
    promo: joi.string(),
    customer_name: joi.string().required(),
    sender_addres: joi.string().min(10).required(),
    receiver_addres: joi.string().min(10).required(),
    items: joi.array().items(
        joi.object({
            id_item: joi.number().required(),
            item_quantity: joi.number().required(),
        })
    ),
})

module.exports = orderSchema
