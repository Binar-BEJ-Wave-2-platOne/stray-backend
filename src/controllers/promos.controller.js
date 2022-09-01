const {sequelize, Promos} = require ('../models')

const getPromos = async (req, res, next) => {
    console.log( "getPromos", req)
    
    try {
        const resPromos = await Promos.findAll()
        if(resPromos > 0){
            return res.status(200).json({
                message: 'success get promos',
                data: resPromos
            })
        }

        throw({
            code: 404,
            message: 'Promos not found'
        })
    } catch (error) {
        next(error)
    }
}

const getaPromo = async (req, res, next) => {
    const id = req.params.id

    try {
        const findOne = await Promos.findByPk(req.params.id)
        if (findOne) {
            return res.status(200).json({
                message: 'success get promo',
                data: findOne
            })
        }

        throw({
            code: 404,
            message: 'Promo not found'
        })
    } catch (error) {
        next(error)
    }
}

const createPromos = async (req, res, next) => {
    console.log( "createPromos", req)

    try {
        await sequelize.transaction(async trx => {
            await Promos.create({
                promo_name,
                promo_category,
                promo_code,
                promo_amount
            }, {
                transaction: trx
            })
        })

        return res.status(201).json({
            message: 'Success create promos'
        })
    } catch (error) {
        next(error)
    }
}

const updatePromos = async (req, res, next) => {
    const id = req.params.id

    try {
        const findOnePromo = await Promos.findByPk(req.params.id)
        if (findOnePromo) {
            await findOnePromo.update(req.body)
            return res.status(200).json({
                message: 'Update promo success'
            })
        }

        throw({
            code: 404,
            message: 'Promo not found'
        })
    } catch (error) {
        next(error)
    }
}

const deletePromos = async(req, res, next) => {
    const id = req.params.id

    try {
        const findOnePromo = await Promos.findByPk(req.params.id)
        if (findOnePromo) {
            await findOnePromo.destroy()
            return res.status(200).json({
                message: 'Delete promo success'
            })
        }

        throw({
            code: 404,
            message: 'Promo not found'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPromos,
    getaPromo,
    createPromos,
    updatePromos,
    deletePromos
}