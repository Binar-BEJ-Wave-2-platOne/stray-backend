const joi = require("joi")

const orderSchema = joi.object({
    id_users: joi.number().required(),
    id_promo: joi.number().required(),
    sender_addres: joi.string().min(10).required(),
    receiver_address: joi.string().min(10).required(),
    total_price: joi.number().required(),

})

module.exports = orderSchema