const {sequelize, Items} = require('../models')


const getItems = async (req, res, next) => {
    console.log( "getITEMS", req)    

    try {
       
     
       await Items.findAll()
       
        return res.status(200).json({
            message: 'success get items'
        })
    } catch (error) {
        next(error)
    }
}


const postItems = async (req, res, next) => {
    console.log( "postITEMS", req)    

    try {
       

        await sequelize.transaction(async trx => {

            await Items.create({
               item_name,
               item_category,
               item_quantity,
               item_price,
               item_image,
               item_status
            }, {
                transaction: trx
            })
        })

        return res.status(201).json({
            message: 'success create items'
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    postItems,
    getItems
}