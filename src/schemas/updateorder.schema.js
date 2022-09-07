const joi = require('joi')

const orderSchema = joi.object({
    customer_name: joi.string(),
    sender_addres: joi.string().min(10),
    receiver_addres: joi.string().min(10),
    status: joi.string().valid('Pending', 'Cancel'),
})

module.exports = orderSchema
