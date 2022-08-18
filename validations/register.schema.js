const Joi = require("joi");

// konsepnya bikin schema agar apa yg direquire wajib diisi.
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(3).required(),
    role_id: Joi.number().required()
})

module.exports = registerSchema