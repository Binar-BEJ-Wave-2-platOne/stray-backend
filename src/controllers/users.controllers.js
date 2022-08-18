require('dotenv').config()// untuk merequier JWT_TOKEN
const { Users, Roles, sequelize } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const bodies = req.body

        // jalanin secara paralel karna tidak ada terkaitan 1 sama lain (concurent)
        const [isRoleExist, isUserExist] = await Promise.all([ 
            Roles.findOne({
                where: {
                    id: bodies.role_id
                },
                attributes: ['id', 'name']
            }),
            Users.findOne({
                where: {
                    email: bodies.email
                },
                attributes: ['id']
            })
        ])

        // cek role_id nya ada atau tidak
        if (!isRoleExist) {
            throw {
                code: 404,
                message: 'Role not found'
            }
        }
        // if user exist, send error message
        if (isUserExist) {
            throw {
                code: 400,
                message: 'Email already exist'
            }
        }
        
        // hash pw karna rahasia
        const hasedPassword = bcrypt.hashSync(bodies.password, 12)
        
           const user = await Users.create({
                email: bodies.email,
                password: hasedPassword,
                name: bodies.name,
                role_id: isRoleExist.id
            })

        return res.status(200).json({
            code: 200,
            message: 'Success create user',
            data: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }    
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        // cek email tersebut ada tidak di db kita
        const user = await Users.findOne({
            where: {
                email
            },
            attributes: ['id', 'role_id', 'password'],
            include: [
                {
                    model: Roles,
                    as: 'role', // sesaui dengan relasi di models
                    attributes: ['id', 'name']
                }
            ]
        })

        // kalo email tidak ada, maka throw error user not found
        if (!user) {
            throw {
                code: 404,
                message: 'user not found'
            }
        }

        // kalo ada kita compare pw
        const isValidPassword = await bcrypt.compare(password, user.password)

        // kalo pwnya beda, throw invalid pw
        if (!isValidPassword) {
            throw {
                code: 403, //FORBIDDEN
                message: 'invalid password'
            }
        }

        // kalo pwnya sama, generate token
        const token = jwt.sign({ user_id: user.id, role: user.role.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        // kirim token di respon
        return res.status(200).json({
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}