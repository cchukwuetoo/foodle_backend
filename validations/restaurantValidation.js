const Joi = require('joi');

const restaurantSchema = Joi.object({
    title: Joi.string().required(),
    time: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    foods: Joi.array().items(Joi.string()).required(),
    pickup: Joi.boolean().default(true),
    delivery: Joi.boolean().default(true),
    owner: Joi.string().required(),
    isAvailable: Joi.boolean().default(true),
    code: Joi.string().required(),
    logoUrl: Joi.string().uri().default('https://res.cloudinary.com/dxkufsejm/image/upload/v1617821903/Profile/blank-profile-picture-973460_640_ewvz8s.png'),
    rating: Joi.number().min(1).max(5),
    ratingCount: Joi.string(),
    coords: Joi.object({
        id: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        latitudeDelta: Joi.number().default(0.0922),
        longitudeDelta: Joi.number().default(0.0421),
        address: Joi.string().required()
    }).required()
});

module.exports = { restaurantSchema };
