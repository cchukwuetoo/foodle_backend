const router = require('express').Router();
const userController = require('../controllers/userController.js');
const {verifyToken, veryAndAuthorization, verifyVendor, verifyDriver} = require('../middleware/verifyToken.js');

router.get('/get-users/:id', veryAndAuthorization, userController.getUser);
router.post('/create-user', veryAndAuthorization, userController.createUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', veryAndAuthorization, userController.deleteUser);

module.exports = router;
