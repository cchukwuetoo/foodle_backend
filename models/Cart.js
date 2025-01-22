const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    foodId: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'},
    additives: {type: Array, required: false},
    instructions: {type: String,  default: '', required: false},
    quantity: {type: Number, default: 1},
    totalPrice: {type: Number, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Cart', cartSchema);
