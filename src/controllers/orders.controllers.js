const { verify } = require('jsonwebtoken')
const { where } = require('sequelize/types')
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

        const promoExist = await Promos.findOne({
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

<<<<<<< HEAD

const UpdateOrder = (req, res, next) => {

    try {
        const bodies = req.body
        const orderExist = await Orders.update({
            where: {
                id: Number(req.params.id)
            }

        })
        if (!orderExist) {
            throw {
                code: 404,
                message: "BARANG TIDAK TERSEDIA"
            }
        }

        const order = await Orders.update({
            sender_addres: bodies.sender_addres,
            receiver_address: bodies.receiver_address,
            total_price: bodies.total_price,
        }, {
            where: {
                id: orderExist.id
            }
        })

        return res.status(201).json({
            code: 201,
            message: "PESAN SUDAH TERUPDATE"
        })
    } catch (error) {
        next(error)
    }


}


const deleteOrder = (res, req, next) => {
    const bodies = req.body
    try {
        Orders.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        return res.status(200).json({
            code: 200,
            message: "ORDER TELAH DI BATALKAN"
        })
    } catch (error) {
        next(error)
    }
}




=======
>>>>>>> 6f57ebc172d892c7bc2877ef04a8ccc0f291659b
module.exports = { CreateOrder }