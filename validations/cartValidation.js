const Joi = require('joi');

const cartValidationSchema = Joi.object({
    userId: Joi.string().required(),
    foodId: joi.string().required(),
    additives: Joi.array().items(Joi.any()).optional(),
    instructions: Joi.string().optional().allow(''),
    quantity: Joi.number().integer().min(1).default(1),
    totalPrice: Joi.number().required().greater(0),
});

module.exports = cartValidationSchema;
