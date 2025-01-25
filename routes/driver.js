const router = require('express').Router();
const driverController = require('../controllers/driverController');
const {veryAndAuthorization, verifyDriver} = require('../middleware/verifyToken');

router.post('/register', driverController.registerDriver);

router.patch('/availability', veryAndAuthorization, verifyDriver, driverController.setDriverAvailability);

module.exports = router;
