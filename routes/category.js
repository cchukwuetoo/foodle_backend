const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const {verifyAdmin, veryAndAuthorization} = require('../middleware/verifyToken');


router.put('/category/:id', veryAndAuthorization, categoryController.updateCategory);
router.post('/category', veryAndAuthorization, categoryController.createCategory);
router.delete('/delete/:id', veryAndAuthorization, categoryController.deleteCategory);
router.get('/get-categories', veryAndAuthorization, categoryController.getAllCategory);

module.exports = router;
