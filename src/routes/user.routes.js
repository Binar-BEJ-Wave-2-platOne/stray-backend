const router = require('express').Router()

const {
    getAllUsers,
    getOneUser,
    updateUser,
    updateUserSelf,
    deleteUser,
} = require('../controllers/user.controller')
const { isTokenValid } = require('../middlewares/verifyToken.middleware')

router.get('/', isTokenValid('ADMIN'), getAllUsers)
router.get('/:id', isTokenValid('ADMIN'), getOneUser)
router.patch('/:id', isTokenValid('ADMIN'), updateUser)
router.patch('/update/self', isTokenValid('MEMBER'), updateUserSelf)
router.delete('/:id', isTokenValid('ADMIN'), deleteUser)

module.exports = router
