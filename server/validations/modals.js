const Joi = require('joi');

module.exports = {
    USER_SCHEMA: Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().length(10).required(),
        password: Joi.string().min(6)
    }),

    LOGIN_SCHEMA: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
}