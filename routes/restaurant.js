const router = require('express').Router();
 const restaurantController = require('../controllers/restaurantController.js');
//const {createRestaurant, serviceAvailability, deleteRestaurant, getRandomRestaurants, getRestaurant} = require('../controllers/restaurantController.js');
const {verifyVendor, veryAndAuthorization, verifyToken, verifyAdmin, verifyDriver} = require('../middleware/verifyToken.js');


router.post('/create-restaurant', veryAndAuthorization, restaurantController.createRestaurant);

router.get('/byId/:id', restaurantController.getRestaurant);

router.get('/:code',  veryAndAuthorization, restaurantController.getRandomRestaurants);

router.delete('/delete/:id', verifyVendor, restaurantController.deleteRestaurant);

router.patch('/toggle/:id', veryAndAuthorization, restaurantController.serviceAvailability);

module.exports = router;






