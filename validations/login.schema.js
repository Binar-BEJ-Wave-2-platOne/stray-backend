const Joi = require("joi");

//require client wajib diisi nantinya
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

module.exports = loginSchema