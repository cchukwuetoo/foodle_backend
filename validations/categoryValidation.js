const Joi  = require('joi');

const categorySchema = Joi.object({

    title: Joi.string().required(),
    value: Joi.string().min(6).required(),
    imageUrl: Joi.string().uri().required()
});

module.exports = { categorySchema };
