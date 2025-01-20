const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const {verifyAdmin} = require('../middleware/verifyToken');


router.put('/category/:id', verifyAdmin, categoryController.updateCategory);
router.post('/category', verifyAdmin, categoryController.createCategory);
router.delete('/delete/:id', verifyAdmin, categoryController.deleteCategory);
router.get('/get-categories', verifyAdmin, categoryController.getAllCategory);
