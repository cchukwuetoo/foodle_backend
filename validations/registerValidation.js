const Joi  = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    userType: Joi.string().valid('Client', 'Driver', 'Vendor').default('Client'),
    profile: Joi.string().default('https://res.cloudinary.com/dxkufsejm/image/upload/v1617821903/Profile/blank-profile-picture-973460_640_ewvz8s.png')
});

module.exports = { registerSchema };
