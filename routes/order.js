const router = require('express').Router();
const orderController = require('../controllers/orderController');
const {veryAndAuthorization, verifyAdmin,verifyDriver} = require('../middleware/verifyToken');


router.post('/', veryAndAuthorization, orderController.placeOrder);

router.get('/order/:id', veryAndAuthorization, orderController.getOrderDetails);

router.get('/order/user', veryAndAuthorization, orderController.getUserOrders);

router.put('/order/status/:id', verifyDriver, verifyAdmin, orderController.updateOrderStatus);

router.put('/order/payment/:id', verifyAdmin, orderController.updatePaymentStatus);


module.exports = router;
