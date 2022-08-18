const router = require('express').Router();

const {getItems, postItems} = require('../controllers/items.controllers');

router.get('/', getItems);
router.post('/items', postItems);

module.exports = router;
