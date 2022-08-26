const router = require('express').Router();

const { getItems, postItems } = require('../controllers/items.controllers');

router.get('/items', getItems);
router.post('/additems', postItems);

module.exports = router;