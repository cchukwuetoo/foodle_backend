const Joi = require('joi');


const addressValidationSchema = Joi.object({
    userId: Joi.string().required(),
    addressLine1: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    deliveryInstructions: Joi.string().optional().allow(''),
    default: Joi.boolean().default(true)
})



module.exports = addressValidationSchema;
