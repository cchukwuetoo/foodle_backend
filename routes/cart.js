const router = require('express').Router();
const cartController = require('../controllers/cartController');
const {veryAndAuthorization} = require('../middleware/verifyToken');


router.post('/', veryAndAuthorization, cartController.addProductToCart);

router.post('/decrement', veryAndAuthorization, cartController.decrementProductQty);

router.delete('/delete/:id', veryAndAuthorization, cartController.removeProductFromCart);

router.get('/', veryAndAuthorization, cartController.fetchUserCart);

router.get('/count', veryAndAuthorization, cartController.getCartCount);

router.delete('/clear', veryAndAuthorization, cartController.clearUserCart);


module.exports = router;
