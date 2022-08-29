const router = require('express').Router();

const {getOrderItems, postOrderItems, getOrderItemsId, updateOrderItems, deleteOrderItems} = require('../controllers/orderitems.controllers copy');

router.get('/', getOrderItems);
router.get('/:id', getOrderItemsId);
router.post('/', postOrderItems);
router.put('/:id', updateOrderItems);
router.delete('/:id', deleteOrderItems)

module.exports = router;
