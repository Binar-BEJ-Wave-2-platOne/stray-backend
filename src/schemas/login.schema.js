const Joi = require('joi');

const loginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  user_name: Joi.string().min(5).required(),
});

module.exports = loginSchema;
