const router = require('express').Router();
const driverController = require('../controllers/driverController');
const {veryAndAuthorization, verifyDriver} = require('../middleware/verifyToken');

router.post('/register', driverController.registerDriver);

router.patch('/availability', veryAndAuthorization, verifyDriver, driverController.setDriverAvailability);

router.get('/', verifyAndAuthorization, driverController.getAllDrivers);

router.get('/:id', verifyAndAuthorization, driverController.getDriverById);

router.put('/:id', verifyAndAuthorization, verifyDriver, driverController.updateDriver);

router.delete('/:id', verifyAndAuthorization, verifyDriver, driverController.deleteDriver);

module.exports = router;
