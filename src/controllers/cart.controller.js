const { sequelize, Items } = require('../models')

const getAllCart = async(req, res, next) => {
    try {
        let findAll = []
        if (req.role === 'MEMBER') {
            findAll = await Cart.findAll({
                include: [
                    {
                        model: 'Items',
                        as: 'id',
                    },
                ],
                where: {
                    id_users: req.id_users,
                },
            })
        } else {
            findAll = await Cart.findAll({
                include: [
                    {
                        model: 'Items',
                        as: 'id',
                    },
                ],
            })
        }

        if (!findAll) {
            throw {
                code: 404,
                message: 'Cart is empty',
            }
        }

        return res.status(200).json({
            message: 'success get Cart',
            data: findAll,
        })
    } catch (error) {
        next(error)
    }
}

module.exports =  { getAllCart}