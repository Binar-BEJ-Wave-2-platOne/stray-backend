const { sequelize, Cart, Items } = require('../models')

const createCart = async (req, res, next) => {
    try {
        const { id_item, quantity } = req.body
        const findItem = await Items.findByPk(req.body.id_item)
        if (!findItem) {
            throw {
                code: 404,
                message: 'Item not found',
            }
        }

        await sequelize.transaction(async (t) => {
            insertCart = await Cart.create(
                {
                    id_users: req.id_users,
                    id_item: id_item,
                    quantity: quantity,
                    name: findItem.item_name,
                    price: findItem.item_price,
                },
                {
                    transaction: t,
                }
            )
        })

        return res.status(201).json({
            message: 'Create cart successful',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCart,
}
