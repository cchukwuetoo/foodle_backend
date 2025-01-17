const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    title: {type: String, required: true},
    time: {type: String, required: true},
    imageUrl: {type: String, required: true},
    foods: {type: Array, required: true},
    pickup: {type: Boolean, required: false, default: true},
    delivery: {type: Boolean, required: false, default: true},
    owner: {type: String, required: true},
    isAvailable: {type: Boolean, required: false, default: true},
    code: {type: String, required: true, unique: true}, // Unique code for each restaurant
    logoUrl: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1617821903/Profile/blank-profile-picture-973460_640_ewvz8s.png'
    },
    rating: {type: Number, min: 1, max: 5},
    ratingCount: { type: String},
    coords: {
        id: {type: String, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        latitudeDelta: {type: Number, required: true, default: 0.0922},
        longitudeDelta: {type: Number, required: true, default: 0.0421},
        address: {type: String, required: true}
    }


}, {timestamps: true});

module.exports = mongoose.model('Restaurant', restaurantSchema);
