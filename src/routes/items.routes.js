const router = require('express').Router();

const {getItems, postItems, getItemsId, updateItems, deleteItems} = require('../controllers/items.controllers');

router.get('/', getItems);
router.get('/:id', getItemsId);
router.post('/', postItems);
router.put('/:id', updateItems);
router.delete('/:id', deleteItems)

module.exports = router;
