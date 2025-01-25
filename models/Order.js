const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.Objectid, ref: "User"},
    orderItems: [],
    orderTotal: {type: Number, required: true},
    deliveryFee: {type: Number, required: true},
    grandTotal: {type: Number, required: true},
    deliveryAddress: {type: mongoose.Schema.Types.Objectid, ref: "Address"},
    paymentMethod: {type: String, required: true},
    paymentStatus: {type: String, default: "Pending", enum: ["Pending", "Completed", "Failed"]},
    orderStatus: {type: String, default: "Placed", enum: ["Placed", "Preparing", "Out for delivery", "Delivered", "Cancelled"]},
    orderDate: {type: Date, default: Date.now()},
    restaurantId: {type: mongoose.Schema.Types.Objectid, ref: "Restaurant"},

}, {timestamps: false});

module.exports = mongoose.model('Order', orderSchema);
