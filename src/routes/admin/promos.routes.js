const router = require('express').Router();
const { createPromos, updatePromos, deletePromos, getPromos, getaPromo } = require('../controllers/promos.controller');
const validation = require('../middlewares/validation.middleware');
const promosSchema = require('../schemas/promos.schema');

router.get('/', getPromos);
router.get('/:id', getaPromo);
router.post('/', validation(promosSchema), createPromos);
router.patch('/:id', updatePromos);
router.delete('/:id', deletePromos);

module.exports = router;