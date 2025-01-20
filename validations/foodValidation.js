const Joi = require('joi');

const foodValidationSchema = Joi.object({
    title: Joi.string().required(),
    foodTags: Joi.array().items(Joi.string()).required(),
    category: Joi.string().required(),
    isAvailable: Joi.boolean().default(true),
    restaurant: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectId pattern
    rating: Joi.number().min(1).max(5).default(5),
    ratingCount: Joi.string(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    additives: Joi.array().items(Joi.string()),
    imageUrl: Joi.array().items(Joi.string().uri()).required()
});

module.exports = foodValidationSchema;
