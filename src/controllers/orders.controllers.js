const { Orders, OrderItems, Promos, Items } = require('../models/index')
const { sequelize } = require('../models')

const CreateOrder = async (req, res, next) => {
    try {
        const { ...createOrder } = req.body
        const itemResult = []
        let findPromo = null
        let orderAmount = 0

        if (req.body.promo) {
            findPromo = await Promos.findOne({
                where: {
                    promo_code: req.body.promo,
                },
            })

            if (!findPromo) {
                throw {
                    code: 404,
                    message: 'promo not found',
                }
            }
        }

        for (const result of req.body.items) {
            const { id_item, item_quantity } = result
            const findItem = await Items.findByPk(id_item)
            if (findItem) {
                const itemData = {
                    id_item: id_item,
                    item_name: findItem.item_name,
                    item_quantity: item_quantity,
                    item_price: findItem.item_price,
                }
                itemResult.push(itemData)
                orderAmount += findItem.item_price * item_quantity
            }
        }

        await sequelize.transaction(async (t) => {
            insertOrder = await Orders.create(
                {
                    ...createOrder,
                    id_users: req.id_users,
                    id_promo: findPromo?.id,
                    no_invoice: `INV-${Date.now()}`,
                    date_order: Date.now(),
                    total_price: orderAmount,
                    order_status: 'Pending',
                },
                {
                    transaction: t,
                }
            )
            await OrderItems.bulkCreate(
                itemResult.map((item) => {
                    return {
                        id_order: insertOrder.id,
                        id_item: item.id_item,
                        item_name: item.item_name,
                        item_price: item.item_price,
                        item_quantity: item.item_quantity,
                    }
                }),
                {
                    transaction: t,
                }
            )
        })
        return res.status(200).json({
            message: 'Create order has successful',
        })
    } catch (error) {
        next(error)
    }
}

const UpdateOrder = (req, res, next) => {
    try {
        const bodies = req.body
        const orderExist = Orders.update({
            where: {
                id: Number(req.params.id),
            },
        })
        if (!orderExist) {
            throw {
                code: 404,
                message: 'BARANG TIDAK TERSEDIA',
            }
        }

        const order = Orders.update(
            {
                sender_addres: bodies.sender_addres,
                receiver_address: bodies.receiver_address,
                total_price: bodies.total_price,
            },
            {
                where: {
                    id: orderExist.id,
                },
            }
        )

        return res.status(201).json({
            code: 201,
            message: 'PESAN SUDAH TERUPDATE',
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
                id: Number(req.params.id),
            },
        })
        return res.status(200).json({
            code: 200,
            message: 'ORDER TELAH DI BATALKAN',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { CreateOrder }
