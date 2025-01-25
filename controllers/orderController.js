const Order = require('../models/Order');


module.exports = {

    // create an new order
    placeOrder: async (req, res) => {
        const newOrder = new Order(req.body);
        try {

            await newOrder.save();
            res.status(201).json({status: true, message: "Order placed successfully", newOrder});

        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }


    },

    // get order details
    getOrderDetails: async (req, res) => {
        const orderId = req.params.id; // get the order id from the request params

        try {

            const order = await Order.findById(orderId);

            if (!order) {
                return res.status(404).json({status: false, message: "Order not found"});
            }

            res.status(200).json({status: true, order});

        } catch(error) {

            res.status(500).json({status: false, message: error.message});

        }
    },


    // get user orders
    getUserOrders: async (req, res) => {
        const userId  = req.user.id; // get the user id from the request object

        try {
            const orders = await Order.find({userId})
                .populate({path: 'restaurantId', select: "name location imageUrl"})

            if(orders) {
                return res.status(200).json({status: true, orders});
            } else {
                return res.status(404).json({status: false, message: "No orders found"});
            }

        } catch(error) {
            res.status(500).json({status: false, message: error.message});
        }

    },

    rateOrder: async (req, res) => {



    },

    // update order status

    updateOrderStatus: async (req, res) => {

        const orderId = req.params.id;
        const {orderStatus} = req.body;

        try {
            const updateOrder = await Order.findByIdAndUpdate(orderId, {orderStatus}, {new: true});

            if (updateOrder) {
                res.status(200).json({status: true, message: 'Order status updated Successfully'})
            } else {
                res.status(404).json({status: false, message: 'Order not found'})

            }
        } catch (error) {
            res.status(500).json({status: false, message: error.message});
        }

    },

    updatePaymentStatus:  async (req, res) => {

        const orderId = req.params.id;
        const {paymentStatus} = req.body;

        try {
            const updateOrder = await Order.findByIdAndUpdate(orderId, {paymentStatus}, {new: true});

            if (updateOrder) {
                res.status(200).json({status: true, message: 'Payment status updated Successfully'})
            } else {
                res.status(404).json({status: false, message: 'Order not found'})
            }

        } catch (error) {

            res.status(500).json({status: false, message: error.message});
        }
    }




}
