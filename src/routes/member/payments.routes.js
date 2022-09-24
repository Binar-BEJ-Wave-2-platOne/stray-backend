const validation = require('../../middlewares/validation.middleware')
const router = require('express').Router();
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')
const { postPayments, updatePayments, deletePayments } = require('../../controllers/payments.controllers');


router.post('/', isTokenValid('MEMBER'), postPayments);
router.post('*', postPayments);
router.put('/:id', isTokenValid('MEMBER'), updatePayments);
router.delete('/:id', isTokenValid('MEMBER'), deletePayments)

module.exports = router;