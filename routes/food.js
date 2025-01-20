const router = require('express').Router();
const foodController = require('../controllers/foodController');
const {verifyVendor} = require('../middleware/verifyToken');

router.post('/add-food', verifyVendor, foodController.addFood);
router.get('/get-food/:id', foodController.getFoodById);
router.post('/tag/:id', verifyVendor, foodController.addFoodTag);
router.get('/get-all-food', foodController.getAllFood);
router.delete('/delete-food/:id', verifyVendor, foodController.deleteFood);
router.get('/restaurant/:restaurantId', foodController.getFoodByRestaurant);
router.patch('/food-availability/:id', verifyVendor, foodController.foodAvailability);
router.patch('/update-food/:id', verifyVendor, foodController.updateFoodById);

module.exports = router;
