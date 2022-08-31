const { response } = require('express')
const { verify } = require('jsonwebtoken')
const { sequelize, Orders, Payments } = require('../models')

const postPayments = async (req, res, next) => {
    try {
        const { id_orders, payment_date, payment_type, amount } = req.body
        const [isOrderExist] = await Promise.all([
            Orders.findOne({ where: { id: id_orders } }),
        ])

        if (!isOrderExist) {
            return res.status(404).json({
                message: 'Order not exist',
            })
        }
        try {
            const dataPayment = {
                id_orders: req.body.id_orders,
                payment_date: req.body.payment_date,
                payment_type: req.body.payment_type,
                amount: req.body.amount,
                payment_status: 'PAID',
            }

            await Payments.create(dataPayment)
                .then((data) => {
                    res.status(201).json({
                        message: 'PAID',
                    })
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message })
                })
        } catch (error) {
            console.log('error', error)
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

const updatePayments = async (req, res, next) => {
    const { id } = req.params

    try {
        const paymentsUpdate = await Payments.update(req.body, {
            where: { id: id },
        })

        if (paymentsUpdate !== 0) {
            return res.status(200).json({
                message: `success update payment by id ${id}`,
            })
        } else {
            next(req)
        }
    } catch (error) {
        next(error)
    }
}

const deletePayments = async (req, res, next) => {
    const { id } = req.params

    try {
        const paymentsDelete = await Payments.destroy({
            where: {
                id: id,
            },
        })

        if (paymentsDelete !== 0) {
            return res.status(200).json({
                message: `success delete payment`,
            })
        } else {
            next(req)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { postPayments, updatePayments, deletePayments }
