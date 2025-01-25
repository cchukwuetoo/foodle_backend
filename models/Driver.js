const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    driver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    vehicleType: {type: String, required: true, enum: ['Bike', 'Scooter', 'Car']},
    vehicleNumber: {type: String, required: true},
    currentLocation: {
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        latitudeDelta: {type: Number, required: true, default: 0.0922},
        longitudeDelta: {type: Number, required: true, default: 0.0421}
    },

    isAvailable: {type: Boolean, default: true},
    rating: {type: Number, default: 0},
    totalDeliveries: {type: Number, default: 0},
    profileImage: {type: String, default: 'default.jpg'},

}, {timestamps: true});

module.exports = mongoose.model('Driver', driverSchema);
