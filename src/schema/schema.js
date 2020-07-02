const Joi = require('joi');

const userPost = Joi.object().keys({
    name: Joi.string().min(2).max(80).required(),
    mail: Joi.string().email().required(),
    role: Joi.any().valid(['USER', 'ADMIN']).required()
});

module.exports = { userPost }
