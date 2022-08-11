const router = require('express').Router();
const { hello } = require('../controllers/hello.controller');

router.get('/', hello);

module.exports = router;
