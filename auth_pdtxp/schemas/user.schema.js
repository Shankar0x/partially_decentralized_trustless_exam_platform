const Joi = require("joi");

const loginUserSchema = Joi.object({
    eno: Joi.string().required(),
    pass: Joi.string().required(),
});

module.exports = loginUserSchema;
