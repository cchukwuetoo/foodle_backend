const router = require('express').Router();
const addressController = require('../controllers/addressController');
const {veryAndAuthorization} = require('../middleware/verifyToken');


router.post('/', veryAndAuthorization, addressController.createAddress);

router.delete('/delete/:id', veryAndAuthorization, addressController.deleteAddress);

router.get('/default', veryAndAuthorization, addressController.getDefaultAddress);

router.get('/', veryAndAuthorization, addressController.getUserAddresses);

router.put('/update/:id', veryAndAuthorization, addressController.updateAddress);

router.post('/default/:id', veryAndAuthorization, addressController.setDefaultAddress);

module.exports = router;

