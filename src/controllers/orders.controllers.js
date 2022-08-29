const { verify } = require('jsonwebtoken')
const { Orders, Users, Promos } = require('../models/index')

const CreateOrder = async(req, res, next) => {
    try {
        const bodies = req.body
        const userExist = await Users.findOne({
            where: {
                id: bodies.id_users,
            },
            attributes: ['name', 'id']
        })

        if (!userExist) {
            throw {
                code: 404,
                message: "USER TIDAK ADA "
            }
        }

        const promoExist = Promos.findOne({
            where: {
                id: bodies.id_promo,
            }
        })
        if (!promoExist) {
            throw {
                code: 404,
                message: "PROMO TIDAK BERLAKU"
            }
        }

        const order = await Orders.create({
            invoice: Date.now(),
            id_users: userExist.id,
            id_promo: promoExist.id,
            no_invoice: Date.now(),
            customer_name: userExist.name,
            date_order: Date.now(),
            sender_addres: bodies.sender_addres,
            receiver_address: bodies.receiver_address,
            total_price: bodies.total_price,
            order_status: "BELUM DI BAYAR"
        })



    } catch (error) {
        next(error)
    }
}


module.exports = { CreateOrder }