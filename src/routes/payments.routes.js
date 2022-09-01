// const router = require('express').Router();
// const { postPayments } = require('../controllers/payments.controllers');
// router.post('/payments', postPayments)
// router.post('*', postPayments)
// module.exports = router;

const router = require('express').Router();

const {postPayments, updatePayments, deletePayments} = require('../controllers/payments.controllers');


router.post('/', postPayments);
// router.post('*', postPayments);
router.put('/:id', updatePayments);
router.delete('/:id', deletePayments)

module.exports = router;
