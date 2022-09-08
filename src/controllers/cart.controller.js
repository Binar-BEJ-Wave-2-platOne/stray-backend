const { sequelize, Items } = require('../models')

const updateCart = async (req, res, next) => {
    try {
        const id = req.params.id

        const findCart = await Cart.findByPk(id)
        if (!findCart) {
            throw {
                code: 404,
                message: 'Cart not found',
            }
        }

        await findCart.update(req.body)

        return res.status(200).json({
            message: 'Update cart success',
            data: findCart,
        })
    } catch (error) {
        next(error)
    } 
}

const deleteCart = async (res, req, next) => {
    try {
        const id = req.params.id
        const findCart = await Cart.findByPk(id)

        if (!findCart) {
            throw {
                code: 404, 
                message: 'Cart not found',
            }
        }

        await findCart.destroy()

        return res.status(200).json({
            message: 'Delete cart success',
        })
    } catch (error) {
       next(error) 
    }
}

module.exports = {
    updateCart,
    deleteCart
}