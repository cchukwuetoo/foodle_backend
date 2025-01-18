const Category = require('../models/Categories');
const { categorySchema } = require('../validations/categoryValidation');

const createCategory = async (req, res) => {

    const {error} = categorySchema.validate(req.body);

    if (error) {
        return res.status(400).json({status: false, message: error.details[0].message});
    }

    const newCategory = new Category(req.body);

    try {

            await newCategory.save();
            res.status(201).json({message: 'Category created successfully'});
    } catch (error) {

        res.status(500).json({status:false, message: "Error creating category", error: error.message})
    }

}

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({}, {__v: 0});
        res.status(200).json(categories);

    } catch (error) {

        res.status(500).json({status: false, message: 'Error getting categories'});

    }
}


const updateCategory = async (req, res)  => {

    const id = req.params.id;
    const {title, value, imageUrl} = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, {
            title,
            value,
            imageUrl
        }, {new: true});

        if(!updatedCategory) {
            return res.status(404).json({status: false, message: 'Category not found'});
        }

        res.status(200).json({status: true, message: 'Category updated successfully'});

    } catch (error) {

        res.status(500).json({status: false, message: 'Error updating category'});

    }

}

const deleteCategory = async (req, res)  => {

        const id = req.params.id;

        try {
            const category = await Category.findByIdAndDelete(id);

            if(!category) {
                return res.status(404).json({status: false, message: 'Category not found'});
            }

            res.status(200).json({status: true, message: 'Category deleted successfully'});

        } catch (error) {

            res.status(500).json({status: false, message: 'Error deleting category'});

        }


}

const getRandomCategories = async (req, res) => {

    try {
        let categories = await Category.aggregate([{$sample: {size: 3}}]);

    } catch (error) {

    }

}



module.exports = {createCategory, updateCategory, deleteCategory, getAllCategory, getRandomCategories}
