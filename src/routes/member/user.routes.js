const router = require('express').Router()

const { getOneUser, updateUser } = require('../../controllers/user.controller')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')

router.get('/', isTokenValid('MEMBER'), getOneUser)
router.patch('/', isTokenValid('MEMBER'), updateUser)

module.exports = router
