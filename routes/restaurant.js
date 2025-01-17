const router = require('express').Router();
 const restaurantController = require('../controllers/restaurantController.js');
//const {createRestaurant, serviceAvailability, deleteRestaurant, getRandomRestaurants, getRestaurant} = require('../controllers/restaurantController.js');
const {verifyVendor, veryAndAuthorization, verifyToken, verifyAdmin, verifyDriver} = require('../middleware/verifyToken.js');


router.post('/', veryAndAuthorization, restaurantController.createRestaurant);

router.get('/byId/:id', restaurantController.getRestaurant);

router.get('/:code',  veryAndAuthorization, restaurantController.getRandomRestaurants);

router.delete('/:id', verifyVendor, restaurantController.deleteRestaurant);

router.patch('/:id', verifyVendor, restaurantController.serviceAvailability);

module.exports = router;






