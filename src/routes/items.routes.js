const router = require('express').Router()
const {
    getItems,
    postItems,
    getItemsId,
    updateItems,
    deleteItems,
} = require('../controllers/items.controllers')
const validation = require('../middlewares/validation.middleware')
const itemsSchema = require('../schemas/createitems.schema')

router.get('/', getItems)
router.get('/:id', getItemsId)
router.post('/', validation(itemsSchema), postItems)
router.put('/:id', updateItems)
router.delete('/:id', deleteItems)

module.exports = router
