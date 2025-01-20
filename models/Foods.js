const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: {type: String, required: true},
    foodTags: {type: Array, required: true},
    category: {type: String, require: true},
    isAvailable: {type: Boolean, required: false, default: true},
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    ratingCount: {type: String},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    additives: {type: Array, required: false},
    imageUrl: {type: Array, required: true}
});

module.exports = mongoose.model('Food', foodSchema);
